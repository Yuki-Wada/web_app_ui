<template>
  <div class="home">
    <div id="selection">
      <v-select
        label="先手後手"
        v-model="first_move"
        :items="options"
        item-text="text"
        item-value="value"
        outlined
        dense
      ></v-select>
    </div>
    <table>
      <tr>
        <td><v-text-field label="CPU 思考時間" v-model.number="mtcs_time_limit"/></td>
      </tr>
    </table>
    <v-btn large v-on:click="start_game">開始ボタン</v-btn>
    <p>{{ status }}</p>
    <p>黒 ({{ black_side() }}): {{ black_count }}個</p>
    <p>白 ({{ white_side() }}): {{ white_count }}個</p>

    <table id="table">
      <template v-for="(row, i) in states">
        <tr :key="i">
          <template v-for="(state, j) in row">
            <td v-bind:style="style('00FF00')" v-if="state === 1" v-on:click="place_stone(i, j)" :key="j">●</td>
            <td v-bind:style="style('00FF00')" v-else-if="state === 2" v-on:click="place_stone(i, j)" :key="j">○</td>
            <td v-bind:style="style('00FF00')" v-else v-on:click="place_stone(i, j)" :key="j"></td>
          </template>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { w3cwebsocket } from 'websocket'

export default {
  name: "Reversi",
  data () {
    return {
      first_move: 'player',
      options: [
        { text: '先手', value: 'player' },
        { text: '後手', value: 'cpu' },
      ],

      // host: '127.0.0.1:8888',
      host: 'intense-chamber-41417.herokuapp.com',
      websocket: null,

      mtcs_time_limit: 10,

      status: "",
      black_count: 2,
      white_count: 2,

      states: [],
    }
  },
  methods: {
    style(rgb) {
      return "background: #" + rgb;
    },
    place_stone(i, j) {
      this.websocket.send(JSON.stringify({
        "status": "player_turn",
        "place_stone": [i, j],
      }));
    },
    black_side() {
      if (this.first_move === 'player') return 'あなた';
      return 'CPU';
    },
    white_side() {
      if (this.first_move === 'player') return 'CPU';
      return 'あなた';
    },
    start_game() {
      this.websocket = new w3cwebsocket("wss://" + this.host + "/play_reversi");
      this.iteration = null;
      this.step = null;

      var self = this;
      function sleep(waitMsec) {
        var startMsec = new Date();
        while (new Date() - startMsec < waitMsec);
      }
      function xor(a, b) {
        return ( a || b ) && !( a && b );
      }

      this.websocket.onopen = function() {
        console.log("### websocket.onopen()");
      };

      this.websocket.onmessage = function(event) {
        let recieved = JSON.parse(event.data);
        if (recieved['status'] === "start_connection") {
          self.websocket.send(JSON.stringify({
            "status": "initialization",
            "config": {
              "time_limit": self.mtcs_time_limit,
              "first_move": self.first_move,
            },
          }));
        }
        else if (recieved["status"] === "player_turn") {
          sleep(20);
          let res = recieved["state"];
          self.states = res['board'];
          self.black_count = res['black'];
          self.white_count = res['white'];
          self.status = "あなたの番です";
        }
        else if (recieved["status"] === "illegal_position") {
          self.status = "そこには打てません";
        }
        else if (recieved["status"] === "player_skip") {
          sleep(20);
          let res = recieved["state"];
          self.states = res['board'];
          self.black_count = res['black'];
          self.white_count = res['white'];
          self.status = "打つ場所がないのでパスとなります";

          self.websocket.send(JSON.stringify({
            "status": "cpu_turn",
          }));
        }
        else if (recieved["status"] === "cpu_turn") {
          sleep(20);
          let res = recieved["state"];
          self.states = res['board'];
          self.black_count = res['black'];
          self.white_count = res['white'];
          self.status = "CPU の番です";

          self.websocket.send(JSON.stringify({
            "status": "cpu_turn",
          }));
        }
        else if (recieved["status"] === "game_finished") {
          sleep(20);
          let res = recieved["state"];
          self.states = res['board'];
          self.black_count = res['black'];
          self.white_count = res['white'];
          if (self.black_count === self.white_count) {
            self.status = "引き分けです";
          }
          else if (xor(self.first_move === 'player', self.black_count > self.white_count)) {
            self.status = "あなたの負けです";
          }
          else {
            self.status = "あなたの勝ちです";
          }
          self.websocket.close();
        }
      };

      // websocketでエラーが発生した時
      this.websocket.onerror = function(event) {
        console.log("### websocket.onerror()");
        console.log(event);
      };

      // websocketをクローズした時
      this.websocket.onclose = function(event) {
        console.log("### websocket.onclose()");
        console.log(event);
      };
    },
    stop_maze() {
      this.websocket.close();
    },
  },
  created () {
  }
}
</script>

<style scoped>

    #selection {
      width: 500px;
      padding: 20px;
    }

    #table {
        margin:0 auto;
        border-collapse: collapse;
        border: 3px solid #ccc;
    }

    #table td {
        border:1px solid #ccc;
        height: 40px;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        font-size: 25px;
        cursor: pointer;
    }

</style>