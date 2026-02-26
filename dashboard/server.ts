const DATA_FILE = new URL("./data.json", import.meta.url).pathname;
const INDEX_FILE = new URL("./index.html", import.meta.url).pathname;

async function readData() {
  const text = await Bun.file(DATA_FILE).text();
  return JSON.parse(text);
}

async function writeData(data: any) {
  await Bun.write(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = Bun.serve({
  port: 3456,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // CORS headers for local dev
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    // Serve index.html
    if (path === "/" || path === "/index.html") {
      const html = await Bun.file(INDEX_FILE).text();
      return new Response(html, {
        headers: { ...headers, "Content-Type": "text/html" },
      });
    }

    // API: Get all data
    if (path === "/api/tasks" && req.method === "GET") {
      const data = await readData();
      return Response.json(data, { headers });
    }

    // API: Create task
    if (path === "/api/tasks" && req.method === "POST") {
      const body = await req.json();
      const data = await readData();

      const maxId = data.tasks.reduce((max: number, t: any) => {
        const num = parseInt(t.id.replace("task-", ""));
        return num > max ? num : max;
      }, 0);

      const newTask = {
        id: `task-${String(maxId + 1).padStart(3, "0")}`,
        title: body.title || "Untitled Task",
        description: body.description || "",
        status: body.status || "pending",
        owner: body.owner || "Nicholas",
        week: body.week || 1,
        category: body.category || "UI",
        estimatedHours: body.estimatedHours || 1,
        createdAt: new Date().toISOString().split("T")[0],
        completedAt: null,
      };

      data.tasks.push(newTask);
      await writeData(data);
      return Response.json(newTask, { status: 201, headers });
    }

    // API: Update task
    const patchMatch = path.match(/^\/api\/tasks\/(task-\d+)$/);
    if (patchMatch && req.method === "PATCH") {
      const taskId = patchMatch[1];
      const body = await req.json();
      const data = await readData();

      const taskIndex = data.tasks.findIndex((t: any) => t.id === taskId);
      if (taskIndex === -1) {
        return Response.json({ error: "Task not found" }, { status: 404, headers });
      }

      const task = data.tasks[taskIndex];
      if (body.title !== undefined) task.title = body.title;
      if (body.description !== undefined) task.description = body.description;
      if (body.status !== undefined) {
        task.status = body.status;
        if (body.status === "completed") {
          task.completedAt = new Date().toISOString().split("T")[0];
        } else {
          task.completedAt = null;
        }
      }
      if (body.owner !== undefined) task.owner = body.owner;
      if (body.week !== undefined) task.week = body.week;
      if (body.category !== undefined) task.category = body.category;
      if (body.estimatedHours !== undefined) task.estimatedHours = body.estimatedHours;

      data.tasks[taskIndex] = task;
      await writeData(data);
      return Response.json(task, { headers });
    }

    // API: Delete task
    const deleteMatch = path.match(/^\/api\/tasks\/(task-\d+)$/);
    if (deleteMatch && req.method === "DELETE") {
      const taskId = deleteMatch[1];
      const data = await readData();

      const taskIndex = data.tasks.findIndex((t: any) => t.id === taskId);
      if (taskIndex === -1) {
        return Response.json({ error: "Task not found" }, { status: 404, headers });
      }

      data.tasks.splice(taskIndex, 1);
      await writeData(data);
      return Response.json({ deleted: taskId }, { headers });
    }

    return new Response("Not Found", { status: 404, headers });
  },
});

console.log(`Dashboard running at http://localhost:${server.port}`);
