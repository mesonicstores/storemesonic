import React, { useState } from 'react';
import './UserProfile.css';
import userImg from '../images/user.jpg';

const UserProfile = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const userData = {
    name: 'User Name',
    email: 'user@example.com',
    joinDate: '2024',
    gamesOwned: 12,
    achievements: 45,
    level: 15
  };

  const recentGames = [
    { id: 1, name: 'Game 1', lastPlayed: '2 hours ago', progress: 75 },
    { id: 2, name: 'Game 2', lastPlayed: '5 days ago', progress: 30 },
    { id: 3, name: 'Game 3', lastPlayed: '1 week ago', progress: 100 }
  ];

  const achievements = [
    { id: 1, name: 'First Purchase', description: 'Made your first game purchase', date: '2024-01-01' },
    { id: 2, name: 'Game Master', description: 'Completed 10 games', date: '2024-01-15' },
    { id: 3, name: 'Social Butterfly', description: 'Added 5 friends', date: '2024-01-10' }
  ];

  const friends = [
    { id: 1, name: 'Friend 1', status: 'online', avatar: userImg },
    { id: 2, name: 'Friend 2', status: 'offline', avatar: userImg },
    { id: 3, name: 'Friend 3', status: 'playing', avatar: userImg }
  ];

  return (
    <div className="profile-modal">
      <div className="profile-content">
        <button className="close-profile" onClick={onClose}>&times;</button>
        
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={userImg} alt={userData.name} />
            <div className="level-badge">Nivel {userData.level}</div>
          </div>
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p className="email">{userData.email}</p>
            <div className="stats">
              <div className="stat-item">
                <i className="bi bi-controller"></i>
                <span>{userData.gamesOwned} Juegos</span>
              </div>
              <div className="stat-item">
                <i className="bi bi-trophy"></i>
                <span>{userData.achievements} Logros</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="bi bi-person"></i> Perfil
          </button>
          <button 
            className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <i className="bi bi-controller"></i> Juegos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <i className="bi bi-trophy"></i> Logros
          </button>
          <button 
            className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <i className="bi bi-people"></i> Amigos
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-details">
              <div className="detail-card">
                <h3>Información Personal</h3>
                <p><strong>Miembro desde:</strong> {userData.joinDate}</p>
                <p><strong>Nivel de Usuario:</strong> {userData.level}</p>
                <p><strong>Total de Logros:</strong> {userData.achievements}</p>
              </div>
              <div className="detail-card">
                <h3>Estadísticas</h3>
                <div className="progress-bar">
                  <div className="progress" style={{width: '75%'}}></div>
                  <span>Nivel {userData.level}</span>
                </div>
                <p>Próximo nivel en: 250 XP</p>
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="games-list">
              {recentGames.map(game => (
                <div key={game.id} className="game-card">
                  <div className="game-info">
                    <h4>{game.name}</h4>
                    <p>Última vez jugado: {game.lastPlayed}</p>
                  </div>
                  <div className="game-progress">
                    <div className="progress-bar">
                      <div className="progress" style={{width: `${game.progress}%`}}></div>
                    </div>
                    <span>{game.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">
                    <i className="bi bi-trophy-fill"></i>
                  </div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    <small>Desbloqueado: {achievement.date}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="friends-list">
              {friends.map(friend => (
                <div key={friend.id} className="friend-card">
                  <img src={friend.avatar} alt={friend.name} />
                  <div className="friend-info">
                    <h4>{friend.name}</h4>
                    <span className={`status ${friend.status}`}>
                      {friend.status === 'online' && '🟢 En línea'}
                      {friend.status === 'offline' && '⚫ Desconectado'}
                      {friend.status === 'playing' && '🎮 Jugando'}
                    </span>
                  </div>
                  <button className="message-btn">
                    <i className="bi bi-chat"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
