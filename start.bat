@echo off
title SDG 13 Photo Booth
cls
echo.
echo  ==========================================
echo    SDG 13 Photo Booth - Starting Server
echo  ==========================================
echo.
echo  Huwag isara ang window na ito!
echo  (Do NOT close this window)
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Hindi makita ang Node.js.
    echo  I-install muna ang Node.js mula sa: https://nodejs.org
    echo.
    pause
    exit /b 1
)

start /B node "%~dp0local-server.cjs"
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo  Server started! Bukas na ang browser.
echo  Para itigil: pindutin ang Ctrl+C o isara ang window na ito.
echo.
echo  ==========================================
node "%~dp0local-server.cjs"
