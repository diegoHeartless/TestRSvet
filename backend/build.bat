@echo off
REM Скрипт для сборки проекта с использованием Maven
set MAVEN_HOME=E:\apache-maven-3.9.12-bin\apache-maven-3.9.12
set PATH=%MAVEN_HOME%\bin;%PATH%

REM Проверка JAVA_HOME
if "%JAVA_HOME%"=="" (
    echo ERROR: JAVA_HOME is not set!
    echo Please set JAVA_HOME to your JDK installation directory.
    echo Example: set JAVA_HOME=C:\Program Files\Java\jdk-17
    pause
    exit /b 1
)

REM Проверка наличия JDK
if not exist "%JAVA_HOME%\bin\javac.exe" (
    echo ERROR: JDK not found at %JAVA_HOME%
    echo Please set JAVA_HOME to a valid JDK installation directory.
    pause
    exit /b 1
)

set PATH=%JAVA_HOME%\bin;%PATH%

cd /d %~dp0
echo Building project...
echo JAVA_HOME: %JAVA_HOME%
echo Maven version:
call mvn.cmd --version
echo.
call mvn.cmd clean compile
pause
