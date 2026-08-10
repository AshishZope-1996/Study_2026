

Use these files and commands.

1. Start the portal UI
- File: index.html
- Command:
```powershell
cd "C:\Users\zope1\OneDrive\Desktop\Study_2026\Study_2026\07. Communication360\app"
python -m http.server 8000
```
- Open in browser:
```text
http://127.0.0.1:8000/index.html
```

2. Start the campaign API backend
- File: campaign_api.py
- Command:
```powershell
cd "C:\Users\zope1\OneDrive\Desktop\Study_2026\Study_2026\07. Communication360\Wrapper"
python campaign_api.py
```

3. Start the dashboard stats API
- File: dashboard_stats_api.py
- Command:
```powershell
cd "C:\Users\zope1\OneDrive\Desktop\Study_2026\Study_2026\07. Communication360\Wrapper"
python dashboard_stats_api.py
```

4. Install PostgreSQL driver if missing
- Command:
```powershell
python -m pip install psycopg2-binary
```

5. Stop the server
- Press:
```text
Ctrl + C
```
in the terminal where the server is running.

If `python` does not work on your machine, use:
```powershell
py -m http.server 8000
```

and
```powershell
py campaign_api.py
```

or
```powershell
py dashboard_stats_api.py
```

6. Open the portal UI in your browser using the following URL:

```
http://127.0.0.1:8000/index.html
```