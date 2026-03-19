@echo off
echo ==============================================
echo   Graphic Design Competition System Startup
echo ==============================================
echo.

echo [1/2] Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd server && npm run dev"

echo [2/2] Starting Frontend Server on port 5173...
start "Frontend Server" cmd /c "cd client && npm run dev && pause"

echo.
echo Application is launching! 
echo Please wait a few seconds and then open: http://localhost:5173
echo.
echo You can close this particular window now. 
echo Keep the other 2 black windows open in the background to keep the site running.
timeout /t 5 >nul
exit
