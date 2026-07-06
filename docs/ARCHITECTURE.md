# PulseCode Architecture

## Vision

PulseCode is an AI-first software engineering platform.

The IDE is built around commands, not UI.

Every feature is reusable by:

- User Interface
- Keyboard
- AI
- Command Palette
- Plugins

---

# Architecture Layers

```
┌──────────────────────────────┐
│        User Interface        │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│       Command System         │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│        AI Engine             │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│    Workspace Services        │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ File System • Git • Terminal │
└──────────────────────────────┘
```

---

# User Interface

Responsible only for presentation.

Examples:

- Explorer
- Editor
- Tabs
- Terminal
- AI Panel

No business logic belongs here.

---

# Command System

Acts as the central execution layer.

Examples:

```
file.save

explorer.rename

terminal.run

git.commit
```

Every interaction executes commands.

---

# AI Engine

AI plans work.

AI executes commands.

AI never directly manipulates the filesystem.

---

# Workspace Services

Responsible for:

- Reading files
- Writing files
- Searching
- Git operations
- Terminal execution

No UI code.

---

# External Systems

Examples:

- Node.js
- File System
- Git
- Docker
- npm

---

# Design Principles

1. Single responsibility.

2. Commands before UI.

3. AI uses the same APIs as users.

4. Plugins extend, never modify.

5. Every sprint leaves PulseCode in a working state.

---

# Long-Term Goal

PulseCode becomes an AI Operating System for software development instead of simply an editor with AI features.