// utils/serverStatus.js
const statusRoute = (req, res) => {
    const team = [
      { id: 1, name: 'Md Arif Ahammed Reza', role: 'Developer' },
      { id: 2, name: 'Utsab Sarkar', role: 'Designer' },
      { id: 3, name: 'Tasnia Rahman', role: 'Team Lead' },
      { id: 4, name: 'Masuduzzanan Niloy', role: 'Tester' }
    ];
  
    res.json({
      status: 'Server is running',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      platform: process.platform,
      version: process.version,
      arch: process.arch,
      pid: process.pid,
      execPath: process.execPath,
      execArgv: process.execArgv,
      Author: 'Md Arif Ahammed Reza',
      Team: 'TaskBlaze',
      TeamMembers: team,
      projectName: 'TaskBlaze',
      projectDescription: 'A collaborative task management application',
      projectVersion: '1.0.0',
      projectLicense: 'MIT',
      timestamp: new Date().toISOString()
    });
  };
  
  module.exports = statusRoute;