---
title: Sietch Vault
type: project

themes: ["systems"]
topics: ["storage","projects"]

links: ["distributed-systems"]

importance: high
status: evergreen
---

Sietch creates self-contained encrypted vaults that can sync over LAN, sneakernet (USB drives), or weak WiFi networks. It operates fully offline, using chunked data, encryption, and peer-to-peer protocols to ensure your files are always protected and available—even when the internet is not.

Why Sietch?
Sietch Vault is designed for environments where:

Internet is scarce, censored, or unreliable
Data privacy is a necessity, not an optional feature
People work nomadically—researchers, journalists, activists
Quick Start
Installation
git clone https://github.com/substantialcattle5/sietch.git
cd sietch
make build
Basic Usage
Create a vault

sietch init --name dune --key-type aes        # AES-256-GCM encryption
sietch init --name dune --key-type chacha20   # ChaCha20-Poly1305 encryption
Add files

# Single file
sietch add ./secrets/thumper-plans.pdf documents/

# Multiple files with individual destinations
sietch add file1.txt dest1/ file2.txt dest2/

# Multiple files to single destination
sietch add ~/photos/img1.jpg ~/photos/img2.jpg vault/photos/
Sync over LAN

sietch sync /ip4/192.168.1.42/tcp/4001/p2p/QmPeerID
# or auto-discover peers
sietch sync
Retrieve files

sietch get thumper-plans.pdf ./retrieved/
Core Features
Feature	Description
AES256/GPG	Files are chunked and encrypted with strong symmetric/asymmetric keys
ChaCha20	Modern authenticated encryption with ChaCha20-Poly1305 AEAD
Offline Sync	Rsync-style syncing over TCP or LibP2P
Gossip Discovery	Lightweight peer discovery protocol for LAN environments
CLI First UX	Fast, minimal CLI to manage vaults and syncs
How It Works
Chunking & Deduplication
Files are split into configurable chunks (default: 4MB)
Identical chunks across files are deduplicated to save space
Please Refer this documentation to understand how Deduplication works.
Encryption
Each chunk is encrypted before storage using:

Symmetric: AES-256-GCM or ChaCha20-Poly1305 with passphrase
Asymmetric: GPG-compatible public/private keypairs
Peer Discovery
Peers discover each other via:

LAN gossip (UDP broadcast)
Manual IP whitelisting
QR-code sharing (coming soon)
Syncing
Inspired by rsync, Sietch only transfers:

Missing chunks
Changed metadata
Over encrypted TCP connections with optional compression
Available Commands
Core Operations
sietch init [flags]                    # Initialize a new vault
sietch add <source> <destination> [args...]  # Add files to vault (multiple file support)
sietch get <filename> <output-path>    # Retrieve files from vault
sietch ls [path]                       # List vault contents
sietch delete <filename>               # Delete files from vault
Network Operations
sietch discover [flags]                # Discover peers on local network
sietch sync [peer-address]             # Sync with other vaults
sietch sneak [flags]                   # Transfer via sneakernet (USB)
Management
sietch dedup stats                     # Show deduplication statistics
sietch dedup gc                        # Run garbage collection
sietch dedup optimize                  # Optimize storage
sietch scaffold [flags]                # Create vault from template
Advanced Usage
View vault contents

sietch ls                              # List all files
sietch ls docs/                        # List files in specific directory
sietch ls --long                       # Show detailed information
Network synchronization

sietch discover                        # Find peers automatically
sietch sync                            # Auto-discover and sync
sietch sync /ip4/192.168.1.5/tcp/4001/p2p/QmPeerID  # Sync with specific peer
Sneakernet transfer

sietch sneak                           # Interactive mode
sietch sneak --source /media/usb/vault # Transfer from USB vault
sietch sneak --dry-run --source /backup/vault  # Preview transfer
Deduplication management

sietch dedup stats                     # Show statistics
sietch dedup gc                        # Clean unreferenced chunks
sietch dedup optimize                  # Optimize storage layout
Planned Features (Not Yet Implemented)
The following features are planned for future releases:

# Recovery operations (planned)
sietch recover --from .backup
sietch recover --from-remote peer-id
sietch recover --rebuild-metadata
sietch recover --verify-hashes

# Standalone decryption (planned)
sietch decrypt <file> <output>

# Direct manifest access (planned)
sietch manifest
Development
Prerequisites
Go 1.23+ – Download
Git – Version control
Quick Development Setup
Clone and setup

git clone https://github.com/substantialcattle5/sietch.git
cd sietch
./scripts/setup-hooks.sh
Verify installation

make check-versions
make build
make test
Available Commands
make help            # List all commands
make dev             # Format, test, build
make check           # Full quality checks
make test-coverage   # Run tests with coverage
make security-audit  # Security checks
For detailed development guidelines, see CONTRIBUTING.md.

Contributing
We welcome contributions of all kinds! Whether you're fixing bugs, adding features, improving documentation, or enhancing UX.

Quick contribution steps:

Fork the repository
Create a feature branch: git checkout -b feature/stillsuit
Make your changes following our style guidelines
Commit using conventional commits
Push and open a Pull Request
See our Contributing Guide for detailed information about:

Development environment setup
Code style guidelines
Testing requirements
Review process
Inspiration & Credits
Sietch draws inspiration from:

Syncthing - Decentralized file synchronization
IPFS - Content-addressed storage
Obsidian Sync - Seamless cross-device syncing
Built with ❤️ in Go by the open source community.