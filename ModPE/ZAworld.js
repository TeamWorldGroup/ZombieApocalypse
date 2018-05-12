/*
Радиация
Время
Дождь
Молнии
Команды на погоду
*/
	
//Глобальные переменные
$rain = 1;
$lighting = 1;
$night = 1;
$game = 0;
$debug = true;
function newLevel()
{
	$game = 1;
	if($night == 1){
		 Level.setTime(15000);
	}
}
function leaveGame()
{
	$game = 0;
}
function modTick()
{
	if($rain == 1){
		Level.setRainLevel(5);
	}else{
		 Level.setRainLevel(0);
	}
	if($lighting == 1){
		Level.setLightningLevel (5);
	}else{
		 Level.setLightningLevel(0);
	}
	if($night == 1){
		setNightMode(0);
		if( Level.getTime() >= 2000){
			Level.setTime(15000);
		}
	}
}

function procCmd(cmd)
{
	switch(cmd){
		 case 'day':
		 $night = 0;
		 Level.setTime(8000);
		 clientMessage('§aДень!');
		 break;
		 case 'night':
		 $night = 1;
		 Level.setTime(15000);
		 clientMessage('§aНочь!');
		 break;
		 case 'lighting on':
		$lighting = 1;
		 Level.setLightningLevel(5);
		clientMessage('§aПогода успешно изменена!');
		break;
		case  'lighting off':
		$lighting = 0;
		 Level.setLightningLevel(0);
		clientMessage('§aПогода успешно изменена!');
		break;
		case 'rain on':
		$rain = 1;
		 Level.setRainLevel(5);
		 clientMessage('§bДождь включён!');
		break;
		case 'rain off':
		$rain = 0;
		 Level.setRainLevel(0);
		 clientMessage('§bДождь выключен!');
		break;
		case 'tunder on':
		$rain = 1;
		$lighting = 1;
		 Level.setLightningLevel(2);
		 Level.setRainLevel(2);
		 clientMessage('§aВключена гроза!');
		break;
		case 'tunder off':
		$lighting = 0;
		$rain = 0;
		 Level.setLightningLevel(0);
		 Level.setRainLevel(0);
		 clientMessage('§aПогода изменена на ясную!');
		break;
		case 'night on':
		Level.setNightMode(false);
		$night = 1;
		clientMessage('§aНочной режим включен!');
		break;
		case 'night off':
		 Level.setNightMode(true);
		 $night = 0;
		clientMessage('§aНочной режим выключен!');
		 break;
	}
}
