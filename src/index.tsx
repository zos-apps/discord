import React, { useState } from 'react';

interface DiscordProps {
  onClose: () => void;
}

interface Server {
  id: string;
  name: string;
  icon: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

const mockServers: Server[] = [
  { id: '1', name: 'Hanzo AI', icon: '🤖' },
  { id: '2', name: 'Gaming', icon: '🎮' },
  { id: '3', name: 'Music', icon: '🎵' },
  { id: '4', name: 'Dev Community', icon: '💻' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'general', type: 'text' },
  { id: '2', name: 'announcements', type: 'text' },
  { id: '3', name: 'random', type: 'text' },
  { id: '4', name: 'Voice Chat', type: 'voice' },
  { id: '5', name: 'Music', type: 'voice' },
];

const mockMessages: Message[] = [
  { id: '1', author: 'Alice', avatar: '👩', content: 'Hey everyone! How\'s it going?', time: '2:30 PM' },
  { id: '2', author: 'Bob', avatar: '👨', content: 'Pretty good! Just finished a big project.', time: '2:31 PM' },
  { id: '3', author: 'Charlie', avatar: '🧑', content: 'Nice! I\'m still working on mine 😅', time: '2:33 PM' },
  { id: '4', author: 'Alice', avatar: '👩', content: 'You got this! Let us know if you need help.', time: '2:35 PM' },
];

const Discord: React.FC<DiscordProps> = ({ onClose }) => {
  const [servers] = useState(mockServers);
  const [channels] = useState(mockChannels);
  const [messages] = useState(mockMessages);
  const [selectedServer, setSelectedServer] = useState('1');
  const [selectedChannel, setSelectedChannel] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="h-full flex bg-[#313338] text-white">
      {/* Server List */}
      <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2">
        <div className="w-12 h-12 rounded-2xl bg-[#5865f2] flex items-center justify-center text-xl cursor-pointer hover:rounded-xl transition-all">
          🏠
        </div>
        <div className="w-8 h-0.5 bg-white/10 rounded-full my-1" />
        {servers.map(server => (
          <div
            key={server.id}
            onClick={() => setSelectedServer(server.id)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl cursor-pointer transition-all hover:rounded-xl
              ${selectedServer === server.id ? 'bg-[#5865f2] rounded-xl' : 'bg-[#313338] hover:bg-[#5865f2]'}
            `}
          >
            {server.icon}
          </div>
        ))}
        <div className="w-12 h-12 rounded-2xl bg-[#313338] flex items-center justify-center text-2xl text-green-500 cursor-pointer hover:rounded-xl hover:bg-green-500 hover:text-white transition-all">
          +
        </div>
      </div>

      {/* Channel List */}
      <div className="w-60 bg-[#2b2d31] flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-black/30 font-semibold">
          {servers.find(s => s.id === selectedServer)?.name}
        </div>
        <div className="flex-1 overflow-auto p-2">
          <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-1">Text Channels</div>
          {channels.filter(c => c.type === 'text').map(channel => (
            <div
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors
                ${selectedChannel === channel.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <span>#</span>
              <span>{channel.name}</span>
            </div>
          ))}
          <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-1 mt-4">Voice Channels</div>
          {channels.filter(c => c.type === 'voice').map(channel => (
            <div
              key={channel.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span>🔊</span>
              <span>{channel.name}</span>
            </div>
          ))}
        </div>
        <div className="h-14 bg-[#232428] flex items-center px-2 gap-2">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm">Z</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">zeekay</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded">⚙️</button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-black/30 gap-2">
          <span className="text-gray-400">#</span>
          <span className="font-semibold">{channels.find(c => c.id === selectedChannel)?.name}</span>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex gap-3 hover:bg-white/5 p-1 rounded">
              <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-xl shrink-0">
                {msg.avatar}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{msg.author}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-gray-300">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#383a40] rounded-lg px-4 py-2">
            <button className="text-gray-400 hover:text-white">➕</button>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === selectedChannel)?.name}`}
              className="flex-1 bg-transparent focus:outline-none placeholder:text-gray-500"
            />
            <button className="text-gray-400 hover:text-white">😊</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
