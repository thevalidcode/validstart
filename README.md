# 📦 ValidStart

ValidStart is a simple but powerful tool that helps you start any kind of software project fast. Whether you're building a frontend website, backend API, full web app, CLI tool, or even a library/package, ValidStart sets everything up for you — no more reading long documentation or setting up folders manually.

---

## ✅ What It Does

- Lets you choose your **project type** (Frontend, Backend, Fullstack, CLI tool, or Library)
- Lets you pick your **language** (JavaScript, TypeScript, Python, Go, Rust, Java, PHP, HTML/CSS)
- Lets you select a **framework** (like React, Django, Laravel, Spring Boot, etc.)
- Lets you choose **extra tools/libraries** to be added automatically
- Then it **creates folders, files, installs dependencies, and sets up Git**

You get a ready-to-code project in seconds.

---

## 🚀 Quick Install (No Node.js Needed)

```bash
curl -fsSL https://raw.githubusercontent.com/thevalidcode/validstart/main/install.sh | bash
```

This works on Linux, macOS, and Windows (via Git Bash). It installs ValidStart globally so you can run it from anywhere.

---

## 🧪 Check if It Works

```bash
validstart hello
```

You should see a message like `✅ Hello from ValidStart!` in green.

---

## 🛠️ Start a New Project

```bash
validstart init
```

It will ask you questions like:

- What is your project name?
- What type of project do you want to create?
- What language do you want to use?
- What framework do you want?
- What extra tools or libraries do you want?
- Should it include things like `.gitignore`, `README.md`, `LICENSE`, `.env`, and `install.sh`?

Once you answer them, it will:

- Create a folder with the right structure
- Add starter code depending on your selections
- Run commands to install the selected libraries
- Create helpful files like `.gitignore`, `README.md`, etc.
- Initialize a Git repository (so you can start tracking your code)

---

## 👨‍💻 For Developers / Contributors

If you want to work on ValidStart itself:

```bash
git clone https://github.com/thevalidcode/validstart.git
cd validstart
npm install
npm run build
```

Then you can run the CLI locally like this:

```bash
node dist/index.js init
```

Or link it globally:

```bash
npm link
validstart init
```

---

## 💡 Features

- Interactive CLI (asks you questions and guides you step-by-step)
- Scaffolds projects in **many programming languages**
- Supports popular **frameworks** and **tooling**
- Adds essential files like `.gitignore`, `README.md`, `LICENSE`, `.env`
- Auto-installs dependencies for you
- Sets up Git for version control
- One-line install (no need to install Node.js)

---

## ⚙️ Tech Behind ValidStart

ValidStart is built using:

- **Node.js** – runtime
- **TypeScript** – safe and maintainable code
- **Inquirer.js** – for terminal prompts
- **Chalk** – for colorful terminal messages
- **fs-extra** – for managing files and folders
- **Commander.js** – for handling CLI commands
- **Execa** – to run shell commands
- **Nexe** – to build one-file binaries for all platforms

---

## 📄 License

This project uses the **ISC License**. You can use it freely for personal or commercial projects.

---

## 🔗 Author

**Ibeh Precious (Valid)**

- GitHub: [@thevalidcode](https://github.com/thevalidcode)
- Twitter: [@thevalidcode](https://twitter.com/thevalidcode)
- LinkedIn: [@thevalidcode](https://www.linkedin.com/in/thevalidcode)
