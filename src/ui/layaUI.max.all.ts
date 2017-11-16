
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class gamebgUI extends View {
		public bt_game_bg:Laya.Image;
		public m_score1:Laya.Label;
		public m_score2:Laya.Label;
		public m_up:Laya.Button;
		public m_down:Laya.Button;
		public m_right:Laya.Button;
		public m_left:Laya.Button;
		public bt_close:Laya.Button;
		public bt_bomb:Laya.Button;
		public m_lable1:Laya.Label;
		public m_lable2:Laya.Label;
		public bt_sound:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bt_game_bg","skin":"comp/bg2.png","name":"gamebg"}},{"type":"Label","props":{"y":130,"x":15,"width":67,"var":"m_score1","text":"0","height":25,"fontSize":20,"font":"SimHei","color":"#01000b","borderColor":"#40e20d","bold":true,"align":"center"}},{"type":"Label","props":{"y":130,"x":521,"width":67,"var":"m_score2","text":"0","height":25,"gray":true,"fontSize":20,"font":"SimHei","color":"#88100e","borderColor":"#bed6b6","align":"center"}},{"type":"Button","props":{"y":213,"x":41,"width":40,"var":"m_up","skin":"comp/button.png","name":"up","label":"up","height":40,"alpha":0.5}},{"type":"Button","props":{"y":290,"x":41,"width":40,"var":"m_down","skin":"comp/button.png","name":"down","label":"down","height":40,"alpha":0.5}},{"type":"Button","props":{"y":252,"x":80,"width":40,"var":"m_right","skin":"comp/button.png","name":"right","label":"right","height":40,"alpha":0.5}},{"type":"Button","props":{"y":252,"x":3,"width":40,"var":"m_left","skin":"comp/button.png","name":"left","label":"left","height":40,"alpha":0.5}},{"type":"Button","props":{"y":28,"x":544,"width":44,"var":"bt_close","skin":"comp/button.png","label":"back","height":23,"alpha":0.5}},{"type":"Button","props":{"y":267,"x":513,"width":50,"var":"bt_bomb","skin":"comp/button.png","name":"bomb","label":"bomb","height":50,"alpha":0.5}},{"type":"Label","props":{"y":67,"x":15,"wordWrap":true,"width":67,"var":"m_lable1","height":50,"gray":false,"font":"娃娃体-简"}},{"type":"Label","props":{"y":67,"x":521,"width":67,"var":"m_lable2","height":50,"gray":true}},{"type":"Button","props":{"y":28,"x":462,"width":72,"var":"bt_sound","skin":"comp/button.png","label":"music set","height":23,"alpha":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gamebgUI.uiView);
        }
    }
}

module ui {
    export class loginUI extends View {
		public bt_login:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/loginBg.png","height":400}},{"type":"Label","props":{"y":327,"x":389,"width":190,"var":"bt_login","text":"游客登陆","height":45,"fontSize":40,"font":"SimSun","align":"center"}},{"type":"Image","props":{"y":11,"x":5,"skin":"comp/bomb_word.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginUI.uiView);
        }
    }
}

module ui {
    export class promptUI extends View {
		public bt_return:Laya.Button;
		public bt_prompt:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,5,5,5","height":400}},{"type":"Button","props":{"y":267,"x":223,"width":153,"var":"bt_return","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"RETURN","height":69}},{"type":"Label","props":{"y":109,"x":146,"width":324,"var":"bt_prompt","height":113,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.promptUI.uiView);
        }
    }
}
