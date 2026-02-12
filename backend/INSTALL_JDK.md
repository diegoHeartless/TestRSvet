# Установка JDK 17 для проекта

## Проблема

У вас установлен только JRE 11 (без компилятора), а проект требует JDK 17+.

## Решение: Установка JDK 17

### Вариант 1: Eclipse Temurin (OpenJDK) - Рекомендуется

1. Скачайте JDK 17 с официального сайта:
   - https://adoptium.net/temurin/releases/?version=17
   - Выберите: **Windows x64**, **JDK**, **17**
   - Формат: **.msi** (установщик)

2. Запустите установщик и установите JDK в стандартное место:
   - `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`

3. После установки установите переменную окружения:
   ```cmd
   setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"
   setx PATH "%PATH%;%JAVA_HOME%\bin"
   ```

4. Перезапустите терминал и проверьте:
   ```cmd
   java -version
   javac -version
   ```

### Вариант 2: Oracle JDK 17

1. Скачайте с официального сайта Oracle:
   - https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
   - Требуется регистрация (бесплатно)

2. Установите и настройте JAVA_HOME аналогично варианту 1

### Вариант 3: Amazon Corretto 17

1. Скачайте с сайта Amazon:
   - https://aws.amazon.com/corretto/
   - Выберите JDK 17 для Windows

2. Установите и настройте JAVA_HOME

## Быстрая установка через Chocolatey (если установлен)

```cmd
choco install temurin17jdk
```

## Проверка установки

После установки JDK выполните:

```cmd
java -version
javac -version
```

Ожидаемый вывод:
```
openjdk version "17.0.x" ...
javac 17.0.x
```

## Настройка JAVA_HOME

После установки JDK установите переменную окружения:

### Временная установка (для текущей сессии):
```cmd
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%
```

### Постоянная установка через GUI:
1. Откройте "Система" → "Дополнительные параметры системы"
2. Нажмите "Переменные среды"
3. Создайте новую системную переменную:
   - **Имя:** `JAVA_HOME`
   - **Значение:** Путь к установленному JDK (например: `C:\Program Files\Eclipse Adoptium\jdk-17.0.10+9-hotspot`)
4. Отредактируйте переменную `Path` и добавьте: `%JAVA_HOME%\bin`
5. Перезапустите терминал/IDE

## После установки JDK 17

Запустите сборку проекта:

```cmd
cd backend
build.bat
```

Если все настроено правильно, сборка должна пройти успешно!
