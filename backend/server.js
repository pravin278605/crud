const cluster = require('cluster');
const os = require('os');
const app = require('./app'); // your Express app (from app.js)

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`👑 Master ${process.pid} is running`);

  // Fork workers (1 per CPU)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart a worker if it dies
  cluster.on('exit', (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died`);
    console.log('⚙️ Starting a new worker...');
    cluster.fork();
  });

} else {
  // Workers share the same server port
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} running on port ${PORT}`);
  });
}
