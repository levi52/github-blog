---
title: "Git 完全指南"
date: "2026-08-30"
summary: "从入门到精通的 Git 版本控制完全指南，涵盖基础命令、分支管理、远程协作、高级技巧与常见问题排查。"
categories:
  - 教程
tags:
  - git
  - 版本控制
  - 工具
---

## 什么是 Git

Git 是目前世界上最先进的分布式版本控制系统，由 Linus Torvalds 于 2005 年创建，用于管理 Linux 内核开发。

## 安装与配置

### 安装

- **Windows**: 下载 [Git for Windows](https://git-scm.com/download/win)
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git` 或 `sudo yum install git`

### 基本配置

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 查看所有配置
git config --list
```

## 基础操作

### 初始化仓库

```bash
# 在当前目录初始化
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder  # 指定目录名
```

### 添加与提交

```bash
# 添加指定文件
git add file.txt

# 添加所有更改
git add .

# 添加所有删除的文件
git add -u

# 提交
git commit -m "commit message"

# 添加并提交
git commit -am "commit message"

# 修改上一次提交
git commit --amend -m "new message"
```

### 查看状态与差异

```bash
# 查看工作区状态
git status

# 查看详细状态
git status -s

# 查看工作区与暂存区的差异
git diff

# 查看暂存区与上次提交的差异
git diff --staged

# 查看某次提交的差异
git diff abc1234

# 查看两个提交之间的差异
git diff abc1234..def5678
```

### 查看历史

```bash
# 查看提交历史
git log

# 单行显示
git log --oneline

# 图形化显示分支
git log --oneline --graph --all

# 查看最近 n 次提交
git log -n 5

# 查看某个文件的历史
git log -p file.txt

# 搜索提交内容
git log --grep="keyword"
git log -S "keyword"

# 查看某次提交的详情
git show abc1234
```

## 分支管理

### 分支操作

```bash
# 查看本地分支
git branch

# 查看所有分支（含远程）
git branch -a

# 创建分支
git branch feature-name

# 切换分支
git checkout feature-name

# 创建并切换分支
git checkout -b feature-name

# 使用 switch 命令（推荐）
git switch main
git switch -c feature-name

# 删除分支
git branch -d feature-name

# 强制删除分支
git branch -D feature-name

# 重命名分支
git branch -m old-name new-name
```

### 合并分支

```bash
# 切换到目标分支
git checkout main

# 合并 feature 分支
git merge feature-name

# 合并但不自动提交
git merge --no-commit feature-name

# 取消合并
git merge --abort
```

### 变基（Rebase）

```bash
# 在 feature 分支上
git checkout feature-name

# 将 feature 分支变基到 main
git rebase main

# 变基过程中跳过某个提交
git rebase --skip

# 取消变基
git rebase --abort
```

### 合并 vs 变基

- **合并（merge）**：保留完整历史，创建合并提交
- **变基（rebase）**：线性历史，更干净但改写提交

## 远程操作

### 远程仓库管理

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 修改远程地址
git remote set-url origin https://github.com/user/repo.git

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename origin upstream
```

### 拉取与推送

```bash
# 拉取远程更改（fetch + merge）
git pull origin main

# 仅拉取不合并（更安全）
git fetch origin
git merge origin/main

# 拉取并变基
git pull --rebase origin main

# 推送到远程
git push origin main

# 推送新分支并设置上游
git push -u origin feature-name

# 强制推送（危险）
git push --force
git push --force-with-lease  # 更安全的强制推送
```

### 追踪远程分支

```bash
# 设置上游分支
git branch -u origin/main

# 查看所有上游分支
git branch -vv
```

## 撤销操作

### 撤销工作区更改

```bash
# 撤销工作区的更改（危险，不可恢复）
git checkout -- file.txt

# 使用 restore 命令（推荐）
git restore file.txt

# 撤销多个文件
git restore file1.txt file2.txt

# 撤销所有更改
git restore .
```

### 撤销暂存

```bash
# 将文件从暂存区移除
git reset HEAD file.txt

# 使用 restore 命令
git restore --staged file.txt

# 撤销所有暂存
git restore --staged .
```

### 回退提交

```bash
# 回退到某次提交（保留更改在工作区）
git reset abc1234

# 回退并保留更改在暂存区
git reset --soft abc1234

# 回退并丢弃所有更改（危险）
git reset --hard abc1234

# 创建新提交来撤销某次提交（安全）
git revert abc1234

# 回退最近 n 次提交
git reset HEAD~3
```

## 暂存工作区

```bash
# 暂存当前更改
git stash

# 暂存并添加描述
git stash push -m "描述信息"

# 暂存未跟踪的文件
git stash -u

# 查看暂存列表
git stash list

# 恢复最近一次暂存
git stash pop

# 恢复但不删除暂存记录
git stash apply

# 删除最近一次暂存
git stash drop

# 清空所有暂存
git stash clear
```

## 标签管理

```bash
# 查看所有标签
git tag

# 创建轻量标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 给某次提交打标签
git tag -a v1.0.0 abc1234

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0

# 切换到某个标签
git checkout v1.0.0

# 基于标签创建分支
git checkout -b hotfix v1.0.0
```

## .gitignore

### 常用模板

```bash
# 忽略所有 .log 文件
*.log

# 忽略 node_modules
node_modules/

# 忽略构建产物
dist/
build/

# 忽略 OS 文件
.DS_Store
Thumbs.db

# 忽略 IDE 配置
.vscode/
.idea/
*.swp

# 忽略环境变量
.env
.env.local

# 忽略所有 .txt 文件，但保留 README.txt
*.txt
!README.txt
```

### 语法说明

```
# 注释
*.log          # 忽略所有 .log 文件
build/         # 忽略 build 目录
!important.txt # 不忽略 important.txt
**/temp        # 忽略所有 temp 目录
doc/*.pdf      # 忽略 doc 目录下的 pdf
doc/**/*.pdf   # 忽略 doc 目录下所有子目录的 pdf
```

## 高级操作

### Cherry-pick（拣选提交）

```bash
# 将某次提交应用到当前分支
git cherry-pick abc1234

# 拣选多个提交
git cherry-pick abc1234 def5678

# 拣选但不自动提交
git cherry-pick --no-commit abc1234

# 取消拣选
git cherry-pick --abort
```

### Bisect（二分查找）

```bash
# 开始二分查找
git bisect start

# 标记当前提交为有问题
git bisect bad

# 标记某个提交为好的
git bisect good abc1234

# Git 会自动二分，测试后标记
git bisect good  # 或 git bisect bad

# 结束二分查找
git bisect reset
```

### Reflog（引用日志）

```bash
# 查看所有操作记录
git reflog

# 恢复误删的分支
git reflog
git checkout abc1234
git branch recovered-branch

# 恢复误 reset 的提交
git reflog
git reset --hard HEAD@{2}
```

### 交互式变基

```bash
# 修改最近 3 次提交
git rebase -i HEAD~3

# 会打开编辑器，可以选择：
# pick   - 保留提交
# reword - 修改提交信息
# edit   - 修改提交内容
# squash - 合并到上一个提交
# drop   - 删除提交
```

### 工作树（Worktree）

```bash
# 添加工作树
git worktree add ../hotfix-branch hotfix

# 查看工作树列表
git worktree list

# 删除工作树
git worktree remove ../hotfix-branch
```

## 子模块（Submodule）

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/submodule

# 克隆含子模块的仓库
git clone https://github.com/user/main-repo.git
git submodule init
git submodule update

# 或一步到位
git clone --recurse-submodules https://github.com/user/main-repo.git

# 更新子模块
git submodule update --remote

# 删除子模块
git submodule deinit path/to/submodule
git rm path/to/submodule
rm -rf .git/modules/path/to/submodule
```

## 常用别名配置

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD"
git config --global alias.unstage "reset HEAD --"
git config --global alias.amend "commit --amend --no-edit"
```

## 常见问题与解决

### 合并冲突

```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit
```

### 误提交了敏感信息

```bash
# 从历史中删除文件
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/sensitive/file' \
  --prune-empty --tag-name-filter cat -- --all

# 强制推送
git push --force

# 注意：仍需要通知协作者重新克隆
```

### 误删除分支恢复

```bash
# 使用 reflog 找到最后一次提交
git reflog

# 找到提交 hash 后创建分支
git branch recovered abc1234
```

### 大文件处理

```bash
# 安装 git-lfs
git lfs install

# 追踪大文件
git lfs track "*.psd"
git lfs track "*.zip"
git add .gitattributes
git add large-file.psd
```

## 工作流

### Git Flow

- **main**: 生产分支
- **develop**: 开发分支
- **feature/**: 功能分支
- **release/**: 发布分支
- **hotfix/**: 热修复分支

### GitHub Flow

1. 从 main 创建分支
2. 在分支上开发
3. 提交 Pull Request
4. 代码审查
5. 合并到 main

### Trunk-Based

- 所有人直接在 main 上开发
- 使用短生命周期分支
- 通过 Feature Flag 控制功能发布

## 实用技巧

### 忽略已被追踪的文件

```bash
# 从 Git 中移除追踪但保留文件
git rm --cached file.txt

# 添加到 .gitignore
echo "file.txt" >> .gitignore
```

### 批量重命名文件

```bash
# 使用通配符
git mv old-prefix-*.txt new-prefix-*.txt

# 使用 bash 循环
for file in old-*.txt; do git mv "$file" "new-${file#old-}"; done
```

### 查找丢失的内容

```bash
# 搜索所有提交中的字符串
git log -S "search-string" --oneline

# 搜索正则表达式
git log -G "pattern" --oneline
```

### 清理未追踪文件

```bash
# 查看将被删除的文件
git clean -n

# 删除未追踪的文件
git clean -f

# 删除未追踪的文件和目录
git clean -fd

# 删除被忽略的文件
git clean -fx
```

### 比较分支差异

```bash
# 查看两个分支的差异
git diff main..feature

# 查看 feature 分支独有的提交
git log main..feature

# 查看两个分支的共同祖先
git merge-base main feature
```

## 总结

Git 是一个强大的版本控制系统，掌握这些命令可以让你在开发中更加高效。建议多实践，在实际项目中逐步掌握这些功能。
