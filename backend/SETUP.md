# Настройка окружения для сборки проекта

## Требования

1. **JDK 17+** (обязательно JDK, а не JRE!)
   - ⚠️ **ВАЖНО:** У вас установлен только JRE 11. Нужно установить полный JDK 17+
   - См. файл `INSTALL_JDK.md` для инструкций по установке
2. **Maven 3.6+** (уже установлен в `E:\apache-maven-3.9.12-bin\apache-maven-3.9.12`)
3. **PostgreSQL** (запускается через Docker Compose)

## Настройка JAVA_HOME

### Вариант 1: Установка через переменные окружения Windows

1. Откройте "Система" → "Дополнительные параметры системы" → "Переменные среды"
2. Создайте новую системную переменную:
   - **Имя:** `JAVA_HOME`
   - **Значение:** Путь к установленному JDK (например: `C:\Program Files\Java\jdk-17`)

3. Добавьте в переменную `Path`:
   - `%JAVA_HOME%\bin`

4. Перезапустите терминал/IDE

### Вариант 2: Установка в текущей сессии терминала

В CMD или PowerShell выполните:

```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
```

### Вариант 3: Автоматический поиск JDK

Если JDK установлен в стандартном месте, можно использовать:

```cmd
for /f "tokens=*" %%i in ('dir /b /s "C:\Program Files\Java\jdk*" 2^>nul ^| findstr /i "bin\javac.exe"') do set JAVA_HOME=%%~dpi..
```

## Проверка установки

Выполните в терминале:

```cmd
java -version
javac -version
mvn --version
```

Должны отображаться версии всех трех инструментов.

## Поиск установленного JDK

Если не знаете, где установлен JDK:

1. Проверьте стандартные места:
   - `C:\Program Files\Java\`
   - `C:\Program Files (x86)\Java\`
   - `C:\Users\%USERNAME%\AppData\Local\Programs\Java\`

2. Или выполните поиск:
   ```cmd
   dir /s /b C:\ | findstr /i "javac.exe"
   ```

## Запуск проекта

После настройки JAVA_HOME:

1. **Запуск PostgreSQL:**
   ```cmd
   cd backend
   docker-compose up -d
   ```

2. **Сборка проекта:**
   ```cmd
   build.bat
   ```

3. **Запуск приложения:**
   ```cmd
   run.bat
   ```

## Решение проблем

### Ошибка: "No compiler is provided in this environment"

**Причина:** Maven не может найти JDK (компилятор Java).

**Решение:**
1. Убедитесь, что установлен именно JDK, а не JRE
2. Установите переменную окружения `JAVA_HOME` на путь к JDK
3. Проверьте, что в `%JAVA_HOME%\bin` есть файл `javac.exe`

### Ошибка: "JAVA_HOME is not set"

**Решение:** Установите переменную окружения `JAVA_HOME` (см. выше)

### Ошибка: "JDK not found at ..."

**Решение:** Проверьте правильность пути в `JAVA_HOME`. Путь должен указывать на корневую директорию JDK (где находятся папки `bin`, `lib`, `jre` и т.д.)
