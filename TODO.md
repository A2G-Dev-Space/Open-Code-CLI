# TODO.md - Quick Reference

**간략한 TODO 목록 - 상세 내용은 TODO_ALL.md 참조**

---

## 📊 Summary

- **Total Features**: 14
- **Priority 0 (Critical)**: 2 features
- **Priority 1 (Important)**: 9 features
- **Priority 2 (Medium)**: 2 features
- **Priority 3 (Low)**: 1 feature
- **Estimated Total Time**: 8-12 weeks

---

## 🚨 Priority 0 - Critical (Must Have)

### 1. GitHub Release Auto-Update System
- **Time**: 3-5 days
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L61-L760](./TODO_ALL.md#L61-L760)
- **Summary**: Automatic version checking and update from GitHub releases

### 2. Plan-and-Execute Architecture
- **Time**: 5-7 days
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L761-L1830](./TODO_ALL.md#L761-L1830)
- **Summary**: Two-LLM system for planning and execution with TODO tracking

---

## ⚡ Priority 1 - Important

### 3. Model Compatibility Layer
- **Time**: 1-2 hours (quick fix) or 3-5 days (full)
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L1831-L2225](./TODO_ALL.md#L1831-L2225)
- **Summary**: Fix Harmony format 422 error for gpt-oss models

### 4. ESC Key LLM Interrupt
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L2226-L2523](./TODO_ALL.md#L2226-L2523)
- **Summary**: Press ESC to stop LLM generation immediately

### 5. YOLO Mode vs Ask Mode
- **Time**: 1-2 days
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L2524-L2904](./TODO_ALL.md#L2524-L2904)
- **Summary**: Tab to toggle between auto-execute and confirmation modes

### 6. File Edit Tool Improvements
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L2905-L3306](./TODO_ALL.md#L2905-L3306)
- **Summary**: Line-based editing with content verification

### 7. Config Init & Model Management
- **Time**: 2 days
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L3307-L4049](./TODO_ALL.md#L3307-L4049)
- **Summary**: First-run setup, /addmodel, /deletemodel, /model, /reset commands

### 8. TODO Auto-Save
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4050-L4500](./TODO_ALL.md#L4050-L4500)
- **Summary**: Auto-save session after each TODO completion

### 9. Tool Usage UI
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4501-L4670](./TODO_ALL.md#L4501-L4670)
- **Summary**: Visual display of tool calls and results

### 10. Status Bar
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4671-L4793](./TODO_ALL.md#L4671-L4793)
- **Summary**: Bottom bar showing path, model, context usage

### 11. Welcome Screen
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4794-L4950](./TODO_ALL.md#L4794-L4950)
- **Summary**: ASCII logo and tips on startup

---

## 📋 Priority 2 - Medium

### 12. Tips/Help Section
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4951-L4976](./TODO_ALL.md#L4951-L4976)
- **Summary**: Enhanced help system with examples

### 13. Input Hints & Autocomplete
- **Time**: 2 days
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L4977-L5006](./TODO_ALL.md#L4977-L5006)
- **Summary**: Command suggestions and auto-completion

---

## 🎨 Priority 3 - Low

### 14. Message Type Styling
- **Time**: 1 day
- **Status**: [ ] Not Started
- **Details**: [TODO_ALL.md#L5007-L5156](./TODO_ALL.md#L5007-L5156)
- **Summary**: Different styles for different message types

---

## 📈 Implementation Order (Recommended)

### Week 1-2: Foundation
- [ ] P0-1: Auto-Update System
- [ ] P1-1: Model Compatibility Layer

### Week 3-4: Core Architecture
- [ ] P0-2: Plan-and-Execute

### Week 5-6: Essential Features
- [ ] P1-2: ESC Interrupt
- [ ] P1-3: YOLO/Ask Mode
- [ ] P1-4: File Edit Improvements
- [ ] P1-5: Config & Model Management

### Week 7-8: UI Enhancements
- [ ] P1-9: Welcome Screen
- [ ] P1-10: Status Bar
- [ ] P1-7: Tool Usage UI
- [ ] P1-6: TODO Auto-Save

### Week 9-10: Polish
- [ ] P2-1: Tips/Help
- [ ] P2-2: Autocomplete
- [ ] P3-1: Message Styling

---

## 🔗 Related Documents

- **[TODO_ALL.md](./TODO_ALL.md)** - Complete implementation details (5,156 lines)
- **[HISTORY_ALL.md](./HISTORY_ALL.md)** - Completed features documentation
- **[BIND_TOOLS.md](./BIND_TOOLS.md)** - LLM tool bindings reference

---

*Last Updated: 2025-01-15*