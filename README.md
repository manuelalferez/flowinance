# Flowinance: Track Your Finances, Focus on What Matters

**Managing your money just got easier!** Visualize your budget quickly and easily with Flowinance.

## Features

### 1. **All-in-One Finance Management**  
   <div align="center">
       <img src="https://ik.imagekit.io/manuelalferez/flowinance/Group%207_QWIwA4HdR.png?updatedAt=1699611329205" alt="Dashboard Overview" width="500"/>
       <p>Get everything you need to manage your finances in one place.</p>
   </div>

### 2. **AI-Powered Transaction Upload and Categorization ✨**  
   <div align="center">
       <img src="https://ik.imagekit.io/manuelalferez/flowinance/Group%208_Xna5E6_TA.png?updatedAt=1699611329296" alt="Transaction Categorization" width="500"/>
       <p>Upload your transactions and let AI handle the categorization with just a few clicks!</p>
   </div>

### 3. **Visualize Your Transactions Effortlessly**  
   <div align="center">
       <img src="https://ik.imagekit.io/manuelalferez/flowinance/Group%2010_Vk1VcIZ_A.png?updatedAt=1699611329310" alt="Transaction Visualization" width="500"/>
       <p>Keep track of all your transactions at a glance.</p>
   </div>

### 4. **Multi-Currency Support**  
   <div align="center">
       <img src="https://ik.imagekit.io/manuelalferez/flowinance/Group%209_-UJANJ6Ik.png?updatedAt=1699611329268" alt="Multi-Currency Support" width="500"/>
       <p>Work seamlessly with various global currencies.</p>
   </div>


## Getting Started

Flowinance is running its database on Supabase. Supabase allows you to run a local instance, so you don’t have to worry about breaking the production database. First, we are going to configure Supabase locally, following the [documentation](https://supabase.com/docs/guides/local-development/cli/getting-started) that Supabase provides. In this example, we will do it using a Mac, but check their documentation for adapting it to your operating system.

1. Install the Supabase CLI: 
    ```bash
    brew install supabase/tap/supabase
    ```
2. The Supabase CLI uses Docker containers to manage the local development stack. [Install Docker](https://docs.docker.com/desktop/). 
3. Run Docker. 
4. Run Supabase locally:
    ```bash
    supabase start
    ```
5. Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. Copy them into your `.env.local` file: 
    ```bash
    Started supabase local development setup.

            API URL: http://localhost:54321
            DB URL: postgresql://postgres:postgres@localhost:54322/postgres
        Studio URL: http://localhost:54323
        Inbucket URL: http://localhost:54324
            anon key: eyJh......
    service_role key: eyJh......
    ```
6. You can check Supabase studio at http://localhost:54323
    <p align="center">
    <img src="https://supabase.com/docs/img/guides/cli/local-studio.png" alt="Supabase Local Studio" width="500">
    </p>

    When you are finished working on your Supabase project, you can stop the stack:

    ```bash
    supabase stop
    ```

7. Install dependencies: 
   ```bash
   npm i
   ```
8. Flowinance uses [Prisma](https://www.prisma.io/) for handling the types and migrations of the database. If this is the first time you are setting up the project, generate the tables for your Supabase local instance: 
    ```bash
    npx prisma migrate dev --name init
    ````
   > You may get an error `Environment variable not found: DATABASE_URL`. To fix it, run:
      ```bash
      export DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
      ```
9. That's it! 🎉 Run Flowinance's development server and open [http://localhost:3000](http://localhost:3000):
    ```bash
    npm run dev
    ```

## Contributing

We would be really happy if you decide to contribute. Please read our [`CONTRIBUTING.md`](https://github.com/manuelalferez/flowinance/blob/main/CONTRIBUTING.md) guide before 😊

## 💬 Have feedback or questions? Join the conversation!

We encourage you to visit our [Flowinance Discussions](https://github.com/manuelalferez/flowinance/discussions) for general questions, feature suggestions, or to engage with the community. It's the best place to share ideas and collaborate!

## Ask me 🤙

You can always contact me via [Telegram](https://t.me/manuelalferez) if you want to talk more about the project 😊

## License 

[GNU General Public License v3.0](https://github.com/manuelalferez/flowinance/blob/master/LICENSE.md)
