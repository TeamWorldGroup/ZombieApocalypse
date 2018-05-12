
print('Команды для мода "Zombie Apocalypse by TeamWorld" успешно загружены!');
function procCmd(cmd)
{
	switch(cmd){
		case 'gm1':
		Level.setGameMode(1);
		clientMessage('§aИгровой режим обновлён');
		break;
		case 'gm0':
		Level.setGameMode(0);
		clientMessage('§aИгровой режим обновлён');
		break;
		 case 'food':
		 Player.addItemInventory(364, 64, 0);
		 clientMessage('§eПриятного аппетита =)');
		 break;
		 case 'bed':
		 Player.addItemInventory(26, 1, 0);
		 clientMessage('§cФиг тебе! Не поспишь =)');
		 break;
	}
}
