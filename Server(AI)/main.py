from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import ollama
import whisper
import logging
from fastapi.middleware.cors import CORSMiddleware
import re
# Initialize logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
def clean_response(response_text):
    # Remove <think>...</think> tags using a regular expression
    cleaned_text = re.sub(r'<think>.*?</think>', '', response_text, flags=re.DOTALL)
    return cleaned_text.strip()
# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
whisper_model = whisper.load_model("base")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        logger.info(f"Received message: {request.message}")
        
        # Call the Ollama chat model
        response = ollama.chat(model="deepseek-r1:8b", messages=[{"role": "user", "content": request.message}])

        # Log the entire response for debugging
        logger.info(f"Full response from Ollama: {response}")
        
        # Check if response is of the type ChatResponse
        if isinstance(response, ollama._types.ChatResponse):  # Make sure the response is a ChatResponse object
            raw_response = response.message.content
            logger.info(f"Raw response: {raw_response}")
            
            # Clean the response text to remove <think> tags
            cleaned_response = clean_response(raw_response)
            return {"response": cleaned_response}
        else:
            # If the response isn't a ChatResponse, log it and raise an error
            logger.error(f"Unexpected response format: {type(response)}")
            raise HTTPException(status_code=500, detail="Unexpected response format")

    except Exception as e:
        logger.error(f"Error in /chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

    try:
        logger.info(f"Received message: {request.message}")
        
        # Call the Ollama chat model
        response = ollama.chat(model="deepseek-r1:8b", messages=[{"role": "user", "content": request.message}])

        # Log the entire response for debugging
        logger.info(f"Full response from Ollama: {response}")
        
        # Check if response is of the type ChatResponse
        if isinstance(response, ollama._types.ChatResponse):  # Make sure the response is a ChatResponse object
            raw_response = response.message.content
            logger.info(f"Raw response: {raw_response}")
            
            # Clean the response text to remove <think> tags
            cleaned_response = clean_response(raw_response)
            return {"response": cleaned_response}
        else:
            # If the response isn't a ChatResponse, log it and raise an error
            logger.error(f"Unexpected response format: {type(response)}")
            raise HTTPException(status_code=500, detail="Unexpected response format")

    except Exception as e:
        logger.error(f"Error in /chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Endpoint to handle audio file input for Whisper
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        temp_filename = "temp_audio.wav"
        with open(temp_filename, "wb") as f:
            f.write(await file.read())

        # Use Whisper to transcribe the audio
        transcription = whisper_model.transcribe(temp_filename)
        os.remove(temp_filename)  # Clean up the temporary file

        return {"transcription": transcription['text']}
    except Exception as e:
        logger.error(f"Error in /transcribe: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing audio file")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
