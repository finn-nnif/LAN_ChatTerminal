# Local Area Network (LAN) Based Chat Terminal

- Fun little project that allows you to communicate to any device with a sufficient enough Text-Based Command Line Interface (CLI) on the same Router. The system is based on the net Javscript Module **(Pre-Installed)** which utilises asynchronous **TCP** connections.

## How to Use

### Requirements
* **Node.js** installed on your system.
* **blessed** Javascript Module Installed.

    ```bash
    npm install blessed
    ```

---

### Starting the Server (as the Server Host)
1. Open a terminal or command prompt.
2. Navigate to the project folder.
3. Run the server:

    ```bash
    node index.js
    ```

    **Output:** The terminal should display the following messages:

    ```
    Server starting...
    Server listening on port 3000
    ```

---

### Connecting to the Server (as a User)
1. Open another terminal on the same network.
2. Use **telnet** or **netcat** to connect to the server:

    ```bash
    telnet <SERVER_IP> 3000
    # OR (if on the same machine)
    telnet localhost 3000
    ```

3. When prompted:

    ```bash
    Enter your username:
    ```

    Type your desired username and press **Enter**.

---

## All Set Up!

You can now type messages and press **Enter** to send them.

* **User messages** will appear in the server terminal as:

    ```
    <USERNAME> Hello everyone!
    ```

* **Server messages** will appear as:

    ```
    <SERVER> Welcome to the chat!
    ```

### Scrolling Chat History
Use the **Up** and **Down** arrow keys while the input box is focused to scroll the chat history. (**Note:** This only works once the chat history has filled the current page.)

---

## Disconnecting
Press **Ctrl+C** in the server or client terminal to exit.

---

## Things to Note

- The Server Terminal *(at this point in time)* doesn't have any extra pivileges or configurations.
- It is just one standalone chat *(at this point in time)* so don't expect much :p
- I may plan to add more features in future (possibly connection to the outside world wowowow)

---

## License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**. See the `LICENSE` file for details.