# WEB-Absenzentool
## Installation und Start

### 1. Node.js und Git installieren (einmalig)

**Windows** (PowerShell):

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
```

Danach das Terminal schliessen und neu öffnen.

**macOS** (Terminal, mit [Homebrew](https://brew.sh)):

```bash
brew install node git
```

Ohne Homebrew: Node.js von [nodejs.org](https://nodejs.org) (LTS-Version) installieren. Git ist auf dem Mac meist vorhanden, sonst bietet macOS beim ersten `git`-Befehl die Installation an.

**Prüfen:**

```bash
node -v
git --version
```

### 2. Projekt klonen

```bash
git clone https://github.com/sma128041/WEB-Absenzentool.git
cd WEB-Absenzentool
```

### 3. Pakete installieren (einmalig)

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 4. Starten (zwei Terminals)

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Danach im Browser öffnen: http://localhost:5173

Server stoppen: `Ctrl + C`