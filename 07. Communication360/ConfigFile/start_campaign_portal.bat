@echo off
title Campaign Portal Startup

echo ============================================
echo      Starting Campaign Portal...
echo ============================================

:: Project Paths
set APP_PATH=C:\Users\zope1\OneDrive\Desktop\Study_2026\Study_2026\07. Communication360\app
set WRAPPER_PATH=C:\Users\zope1\OneDrive\Desktop\Study_2026\Study_2026\07. Communication360\Wrapper


echo.
echo Installing PostgreSQL Driver...
python -m pip install psycopg2-binary

echo.
echo Starting UI Server...
start "Portal UI" cmd /k "cd /d "%APP_PATH%" && python -m http.server 8000"

echo.
echo Starting Campaign API...
start "Campaign API" cmd /k "cd /d "%WRAPPER_PATH%" && python campaign_api.py"

echo.
echo Starting Dashboard Stats API...
start "Dashboard Stats API" cmd /k "cd /d "%WRAPPER_PATH%" && python dashboard_stats_api.py"

timeout /t 5 >nul

echo.
echo Opening Portal...
start http://127.0.0.1:8000/index.html

echo.
echo ============================================
echo All services started successfully.
echo ============================================
pause