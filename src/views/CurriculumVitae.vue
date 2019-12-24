<template>
    <div>
        <v-app>
            <div id="name" class="block">
                <div class="header">氏名</div>
                和田 悠暉 (わだ ゆうき)
            </div>

            <div id="birthday" class="block">
                <div class="header">生年月日</div>
                1991/07/21
            </div>

            <div id="gender" class="block">
                <div class="header">性別</div>
                男
            </div>

            <div id="birthplace" class="block">
                <div class="header">出身地</div>
                大阪府岸和田市
            </div>

            <div id="degree" class="block">
                <div class="header">学位</div>
                理学修士 (京都大学) 2017/03
            </div>
            
            <div id="background" class="block">
                <div class="header">学歴・職歴</div>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">年</th>
                                <th class="text-left">月</th>
                                <th class="text-left">学歴・職歴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in background_items" :key="item.date">
                                <td>{{ item.year }}</td>
                                <td>{{ item.month }}</td>
                                <td>{{ item.item }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>

            <div id="technical_skill" class="block">
                <div class="header">技術</div>
                <div v-for="item in technical_skills" :key="item.type">
                    <div>{{ item.type }}</div>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-left">name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="content in item.contents" :key="content.name">
                                <td>{{ content.name }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </div>

            <div id="technical_skill" class="block">
                <div class="header">興味</div>
                <div v-for="item in interests" :key="item.type">
                    <div>{{ item.type }}</div>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-left">name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="content in item.contents" :key="content.name">
                                <td>{{ content.name }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </div>
        </v-app>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            background_items: [
                {
                    "year": 2007,
                    "month": 4,
                    "item": "大阪府立 三国丘高等学校 全日制 入学",
                },
                {
                    "year": 2010,
                    "month": 3,
                    "item": "大阪府立 三国丘高等学校 全日制 卒業",
                },
                {
                    "year": 2010,
                    "month": 4,
                    "item": "京都大学 理学部 理学科 入学",
                },
                {
                    "year": 2014,
                    "month": 3,
                    "item": "京都大学 理学部 理学科 数学教室 卒業 (指導教員: 堤 誉志雄 教授)",
                },
                {
                    "year": 2014,
                    "month": 4,
                    "item": "京都大学大学院 理学研究科 修士課程 数学・数理解析専攻 数理解析系 進学",
                },
                {
                    "year": 2017,
                    "month": 3,
                    "item": "京都大学大学院 理学研究科 修士課程 数学・数理解析専攻 数理解析系 修了 (指導教員: 望月 新一 教授)",
                },
                {
                    "year": 2017,
                    "month": 4,
                    "item": "株式会社 NTTデータ数理システム 入社 (配属: データマイニング部)",
                },
                {
                    "year": 2019,
                    "month": 2,
                    "item": "一身上の都合により退職",
                },
                {
                    "year": 2019,
                    "month": 3,
                    "item": "富士フイルム株式会社 入社 (配属: R&D 統括本部 メディカルシステム開発センター ITグループ)"
                },
                {
                    "item": "現在に至る"
                }
            ],
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    value: 'name',
                }
            ],
            technical_skills: [
                {
                    "type": "プログラミング言語",
                    "contents": [
                        {
                            "name": "Python"
                        },
                        {
                            "name": "C++"
                        },
                        {
                            "name": "C#"
                        }
                    ],
                },
                {
                    "type": "Deep Learning フレームワーク",
                    "contents": [
                        {
                            "name": "TensorFlow (Python)"
                        },
                        {
                            "name": "PyTorch (Python)"
                        },
                        {
                            "name": "Flask (Python)"
                        }
                    ],
                },
                {
                    "type": "Web Application フレームワーク",
                    "contents": [
                        {
                            "name": "Flask (Python)"
                        }
                    ]
                },
                {
                    "type": "Web Application UI フレームワーク",
                    "contents": [
                        {
                            "name": "Vue.js (Node.js)",
                            "type": "UI フレームワーク"
                        }
                    ]
                },
                {
                    "type": "データベース",
                    "contents": [
                        {
                            "name": "SQL"
                        },
                        {
                            "name": "Redis"
                        }
                    ]
                },
                {
                    "type": "ライブラリ",
                    "contents": [
                        {
                            "name": "Boost"
                        },
                        {
                            "name": "Scikit-learn (Python, 機械学習)"
                        },
                        {
                            "name": "OpenCV(Python, 画像処理)"
                        }
                    ]
                },
                {
                    "type": "クラウドサービス",
                    "contents": [
                        {
                            "name": "heroku"
                        },
                        {
                            "name": "Amazon Web Service"
                        },
                        {
                            "name": "Microsoft Azure"
                        }
                    ]
                }
            ],
            interests: [
                {
                    "type": "機械学習",
                    "contents": [
                        {
                            "name": "自然言語処理"
                        },
                        {
                            "name": "画像処理"
                        }
                    ]
                },
                {
                    "type": "数学",
                    "contents": [
                        {
                            "name": "整数論"
                        },
                        {
                            "name": "代数幾何学"
                        },
                        {
                            "name": "確率論"
                        },
                        {
                            "name": "数理最適化"
                        },
                        {
                            "name": "確率論"
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style>
.header {
	font-size: 100%;
	background-color: #FFFFFF;
	border-bottom: 4px solid #647D46;		/*h2タグの下線*/
	background-image: url(../assets/h2bg.gif);	/*h2タグの背景画像*/
	background-position: bottom;
	background-repeat: repeat-x;
	border-top: 1px solid #E8EFDF;			/*h2タグの上線*/
	padding: 5px 5px 3px 10px;
	color: #647D46;
}

.block {
    padding-bottom: 30px;
    padding-left: 10%;
    padding-right: 10%;
}

</style>