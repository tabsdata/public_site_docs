# Secrets Management

Source: https://docs.tabsdata.com/developer/guide/secrets-management/

Credentials used by Publisher and Subscriber Functions are stored in Connections. Connections are credential stores that are attached to collections, which enable the function inside the collection to use the credentials.

A Project can also hold secrets that its Functions read directly. See [Project Secrets](https://docs.tabsdata.com/developer/guide/projects#project-secrets).

To register a connection into Tabsdata, the user must generate a `.yaml` connection document template through the `tdk connection template` cli command and fill in the required credentials. Once the document is completed, it must be attached to a collection through the `tdk collection create` or `tdk collection update` cli command.

During connection registration, Tabsdata **dehydrates** the Connection document by extracting its credentials into a separate secret store and replacing them in the stored Connection with references to those secrets.

Once stored, credentials are only made available to a Function when it runs. In fact, once credentials are in Tabsdata, there is no way to read them out of the system. This is by design, ensuring your secrets are always secure.

When a coding agent builds workflows for you, it can only pass credentials into Tabsdata that you give it. Understand the security implications of providing credentials to your LLM before you do.

There are several ways to pass secrets to an LLM for creating connections.

## Create the Connection Yourself

The most secure option is to create the Connection outside of the agent.

You can ask the agent to generate a Connection template, then add the credentials yourself, and register the Connection with Tabsdata using the \`tdk connection create\` or tdk connection update\` CLI command. The agent can then create or register Functions against the Collection without ever accessing the credentials required.

This keeps the credentials out of the agent's context and session history.

## Provide Credentials Through Environment Variables

Connection templates can reference credentials using `$secret:<VARIABLE>`. When working through an agent, the environment variable must be available to both the process running the LLM and the Tabsdata server. This means the variable must be set in the shell environment before both processes are started.

This avoids placing the credential directly in the agent prompt, but still gives the agent process access to it. Environment variables may also be visible to other processes running in the same environment.

For these reasons, environment variables are better suited for development and testing than for long-lived production credentials. Adding or updating secrets also requires restarting both the agent and the Tabsdata server with the updated shell environment.

warning

Storing credentials in environment variables does not prevent the agent from accessing their values. However, it allows the agent to pass the environment variable name as a literal to the Tabsdata server, which can then resolve the value server-side. This reduces the likelihood of the secret being captured in the agent's transcript.

## Provide Credentials Directly to the Agent

You can also provide credentials directly to the agent and have it create the Connection for you.

This is the simplest option, but the credential passes through the agent's context and may be stored in its session history. Credentials provided this way may be at increased risk for exposure.

## Provide Credentials Through a File

In scenarios where the agent is requesting multiple points of data, or in sessions where providing credentials directly inline requires pasting the same content multiple times, you can pass all relevant data into a `.txt` file and pass the path to the agent during your session

warning

Putting credentials in a file and asking an agent to read that file does not prevent the agent from accessing them. Once the agent reads the file, the credentials have passed through the agent just as if they were provided directly.
