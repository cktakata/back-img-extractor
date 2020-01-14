import { WorkerTask } from './worker.task';

export async function start() {
    const myArgs = process.argv.slice(2)[0];
    const worker = new WorkerTask(myArgs);
    const msg = await worker.baixar();
    process.send(msg);
}
start()