#Kinesys Main.py
import discord
import asyncio

client = discord.Client()

@client.event

    async def_on_ready():
       
        print(client.user.name)
        print(client.user.id)
        print("Kinesys Bot_ready")
    
    game = discord.Game("Kinesys Server")

    await client.change_presence(status = discord.status.idle, activity = game)

@client.event
    async def on_message(message):

        if message.author.bot:
            return None
        if message.content.startswith("hi"):

            channel = message.channel
            
                await channel.send("Hi Kinesys")

    client.run("token")
