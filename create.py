import json

data = {
  "name": "anuj-build",
  "version": "1.0.0",
  "private": True,
  "workspaces": ["client", "server"],
  "scripts": {
    "dev": "concurrently -n CLIENT,SERVER -c cyan,yellow \"npm run dev --workspace=client\" \"npm run dev --workspace=server\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}

with open("package.json", "w") as f:
    json.dump(data, f, indent=2)

print("package.json created successfully!")