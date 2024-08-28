function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            monsterHelth: 100,  
            playerHelth: 100,
            currentRound: 0,
            winner: null,
            logMessage: [] 
        };
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHelth < 0 ){
                return { width: '0%' };
            }
            return { width: this.monsterHelth + '%' };
        },
        playerBarStyle() {
            if(this.playerHelth < 0 ){
                return { width: '0%' };
            }
            return { width: this.playerHelth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHelth(value) {
            if (value <= 0 && this.monsterHelth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHelth(value) {
            if (value <= 0 && this.playerHelth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            let attVal = getRandomNumber(5, 12); 
            this.monsterHelth -= attVal; 
            this.addLogMessage('player', 'atack', attVal)
            this.attackPlayer(); 
        },
        attackPlayer() {
            let attVal = getRandomNumber(8, 15); 
            this.playerHelth -= attVal; 
            this.addLogMessage('monster', 'atack', attVal)
        },
        specialAttackt() {
            this.currentRound++;
            let attVal = getRandomNumber(10, 25); 
            this.monsterHelth -= attVal; 
            this.addLogMessage('player', 'special-atack', attVal)
            this.attackPlayer(); 
        },
        healPlayer() {
            const healval = getRandomNumber(8, 20);
            if (this.playerHelth + healval > 100) {
                this.playerHelth = 100;
            } else {
                this.playerHelth += healval;
            }
            this.addLogMessage('player', 'heal', healval)
            this.attackPlayer();
        },
        restart(){
            this.monsterHelth= 100;
            this.playerHelth= 100;
            this.currentRound= 0;
            this.winner= null ;
            this.logMessage = [] 
        },
        surrender(){
            this.winner = 'monster'
        },
        addLogMessage(who, what, value){
            this.logMessage.unshift({
                actionBy: who,
                actionType:what,
                actionValue: value
            })
        }
    }
});

app.mount('#game1'); 
