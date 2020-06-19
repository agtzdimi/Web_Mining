import { Component } from "@angular/core";
import { RetrieveDataService } from "../../@theme/components/charts/retrieveData.service";

@Component({
  selector: "ngx-user-profiling",
  templateUrl: "./user-profiling.component.html",
  styleUrls: ["./user-profiling.component.scss"]
})
export class UserProfilingComponent {
  userProfileObj = {
    totalMale: 0,
    totalFemale: 0,
    totalMaleHate: 0,
    totalFemaleHate: 0,
    totalFemaleNotHate: 0,
    totalMaleNotHate: 0,
    totalYoung: 0,
    totalMiddleAged: 0,
    totalElder: 0,
    totalYoungHate: 0,
    totalElderHate: 0,
    totalMiddleAgedHate: 0,
    totalElderNotHate: 0,
    totalMiddleAgedNotHate: 0,
    totalYoungNotHate: 0,
    totalNonRecognized: 0,
    totalNonRecognizedNotHate: 0,
    totalNonRecognizedHate: 0,
    totalMaleNeutral: 0,
    totalMalePositive: 0,
    totalMaleNegative: 0,
    totalFemaleNeutral: 0,
    totalFemalePositive: 0,
    totalFemaleNegative: 0,
    totalMaleAnger: 0,
    totalMaleAnticipation: 0,
    totalMaleDisgust: 0,
    totalMaleFear: 0,
    totalMaleJoy: 0,
    totalMaleLove: 0,
    totalMaleOptimism: 0,
    totalMalePessimism: 0,
    totalMaleSadness: 0,
    totalMaleSurprise: 0,
    totalMaleTrust: 0,
    totalFemaleAnger: 0,
    totalFemaleAnticipation: 0,
    totalFemaleDisgust: 0,
    totalFemaleFear: 0,
    totalFemaleJoy: 0,
    totalFemaleLove: 0,
    totalFemaleOptimism: 0,
    totalFemalePessimism: 0,
    totalFemaleSadness: 0,
    totalFemaleSurprise: 0,
    totalFemaleTrust: 0,
    totalYoungNeutral: 0,
    totalYoungPositive: 0,
    totalYoungNegative: 0,
    totalMiddleAgedNeutral: 0,
    totalMiddleAgedPositive: 0,
    totalMiddleAgedNegative: 0,
    totalYoungAnger: 0,
    totalYoungAnticipation: 0,
    totalYoungDisgust: 0,
    totalYoungFear: 0,
    totalYoungJoy: 0,
    totalYoungLove: 0,
    totalYoungOptimism: 0,
    totalYoungPessimism: 0,
    totalYoungSadness: 0,
    totalYoungSurprise: 0,
    totalYoungTrust: 0,
    totalMiddleAgedAnger: 0,
    totalMiddleAgedAnticipation: 0,
    totalMiddleAgedDisgust: 0,
    totalMiddleAgedFear: 0,
    totalMiddleAgedJoy: 0,
    totalMiddleAgedLove: 0,
    totalMiddleAgedOptimism: 0,
    totalMiddleAgedPessimism: 0,
    totalMiddleAgedSadness: 0,
    totalMiddleAgedSurprise: 0,
    totalMiddleAgedTrust: 0,
    totalElderNeutral: 0,
    totalElderPositive: 0,
    totalElderNegative: 0,
    totalElderAnger: 0,
    totalElderAnticipation: 0,
    totalElderDisgust: 0,
    totalElderFear: 0,
    totalElderJoy: 0,
    totalElderLove: 0,
    totalElderOptimism: 0,
    totalElderPessimism: 0,
    totalElderSadness: 0,
    totalElderSurprise: 0,
    totalElderTrust: 0
  };
  data: any;
  ageBars: (string | number)[][];
  genderBars: (string | number)[][];
  sentimentBarsAge: (string | number)[][];
  sentimentBarsGender: (string | number)[][];
  emotionBarsAge: (string | number)[][];
  emotionBarsGender: (string | number)[][];
  mapDataSet: boolean = false;

  constructor(private retrieveDataService: RetrieveDataService) {
    if (this.retrieveDataService.chartData) {
      this.onDataloaded();
    }
    this.retrieveDataService.chartDataEmmitter.subscribe(data => {
      this.onDataloaded();
    });
  }

  onDataloaded() {
    this.data = this.retrieveDataService.chartData;
    for (let i = 0; i < this.data["tweets"].length; i++) {
      // Age Group Calculation
      if (this.data["tweets"][i]["age_group"] === "Young") {
        this.userProfileObj["totalYoung"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalYoungNotHate"]++;
        } else {
          this.userProfileObj["totalYoungHate"]++;
        }
        // Sentiment Calculation
        if (this.data["tweets"][i]["sentiment"]["pred"] === "neutral") {
          this.userProfileObj["totalYoungNeutral"]++;
        } else if (this.data["tweets"][i]["sentiment"]["pred"] === "positive") {
          this.userProfileObj["totalYoungPositive"]++;
        } else {
          this.userProfileObj["totalYoungNegative"]++;
        }

        // Emotion Calculation
        if (this.data["tweets"][i]["emotion"]["pred"].includes("joy")) {
          this.userProfileObj["totalYoungJoy"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anger")
        ) {
          this.userProfileObj["totalYoungAnger"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anticipation")
        ) {
          this.userProfileObj["totalYoungAnticipation"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("disgust")
        ) {
          this.userProfileObj["totalYoungDisgust"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("fear")) {
          this.userProfileObj["totalYoungFear"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("love")) {
          this.userProfileObj["totalYoungLove"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("optimism")
        ) {
          this.userProfileObj["totalYoungOptimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("pessimism")
        ) {
          this.userProfileObj["totalYoungPessimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("sadness")
        ) {
          this.userProfileObj["totalYoungSadness"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("surprise")
        ) {
          this.userProfileObj["totalYoungSurprise"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("trust")
        ) {
          this.userProfileObj["totalYoungTrust"]++;
        }
      } else if (this.data["tweets"][i]["age_group"] === "Middle_aged") {
        this.userProfileObj["totalMiddleAged"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalMiddleAgedNotHate"]++;
        } else {
          this.userProfileObj["totalMiddleAgedHate"]++;
        }

        // Sentiment Calculation
        if (this.data["tweets"][i]["sentiment"]["pred"] === "neutral") {
          this.userProfileObj["totalMiddleAgedNeutral"]++;
        } else if (this.data["tweets"][i]["sentiment"]["pred"] === "positive") {
          this.userProfileObj["totalMiddleAgedPositive"]++;
        } else {
          this.userProfileObj["totalMiddleAgedNegative"]++;
        }

        // Emotion Calculation
        if (this.data["tweets"][i]["emotion"]["pred"].includes("joy")) {
          this.userProfileObj["totalMiddleAgedJoy"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anger")
        ) {
          this.userProfileObj["totalMiddleAgedAnger"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anticipation")
        ) {
          this.userProfileObj["totalMiddleAgedAnticipation"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("disgust")
        ) {
          this.userProfileObj["totalMiddleAgedDisgust"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("fear")) {
          this.userProfileObj["totalMiddleAgedFear"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("love")) {
          this.userProfileObj["totalMiddleAgedLove"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("optimism")
        ) {
          this.userProfileObj["totalMiddleAgedOptimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("pessimism")
        ) {
          this.userProfileObj["totalMiddleAgedPessimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("sadness")
        ) {
          this.userProfileObj["totalMiddleAgedSadness"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("surprise")
        ) {
          this.userProfileObj["totalMiddleAgedSurprise"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("trust")
        ) {
          this.userProfileObj["totalMiddleAgedTrust"]++;
        }
      } else if (this.data["tweets"][i]["age_group"] === "Elder") {
        this.userProfileObj["totalElder"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalElderNotHate"]++;
        } else {
          this.userProfileObj["totalElderHate"]++;
        }

        // Sentiment Calculation
        if (this.data["tweets"][i]["sentiment"]["pred"] === "neutral") {
          this.userProfileObj["totalElderNeutral"]++;
        } else if (this.data["tweets"][i]["sentiment"]["pred"] === "positive") {
          this.userProfileObj["totalElderPositive"]++;
        } else {
          this.userProfileObj["totalElderNegative"]++;
        }

        // Emotion Calculation
        if (this.data["tweets"][i]["emotion"]["pred"].includes("joy")) {
          this.userProfileObj["totalElderJoy"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anger")
        ) {
          this.userProfileObj["totalElderAnger"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anticipation")
        ) {
          this.userProfileObj["totalElderAnticipation"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("disgust")
        ) {
          this.userProfileObj["totalElderDisgust"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("fear")) {
          this.userProfileObj["totalElderFear"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("love")) {
          this.userProfileObj["totalElderLove"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("optimism")
        ) {
          this.userProfileObj["totalElderOptimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("pessimism")
        ) {
          this.userProfileObj["totalElderPessimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("sadness")
        ) {
          this.userProfileObj["totalElderSadness"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("surprise")
        ) {
          this.userProfileObj["totalElderSurprise"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("trust")
        ) {
          this.userProfileObj["totalElderTrust"]++;
        }
      }

      // Gender Calculation
      if (this.data["tweets"][i]["gender"] === "Male") {
        this.userProfileObj["totalMale"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalMaleNotHate"]++;
        } else {
          this.userProfileObj["totalMaleHate"]++;
        }

        // Sentiment Calculation
        if (this.data["tweets"][i]["sentiment"]["pred"] === "neutral") {
          this.userProfileObj["totalMaleNeutral"]++;
        } else if (this.data["tweets"][i]["sentiment"]["pred"] === "positive") {
          this.userProfileObj["totalMalePositive"]++;
        } else {
          this.userProfileObj["totalMaleNegative"]++;
        }

        // Emotion Calculation
        if (this.data["tweets"][i]["emotion"]["pred"].includes("joy")) {
          this.userProfileObj["totalMaleJoy"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anger")
        ) {
          this.userProfileObj["totalMaleAnger"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anticipation")
        ) {
          this.userProfileObj["totalMaleAnticipation"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("disgust")
        ) {
          this.userProfileObj["totalMaleDisgust"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("fear")) {
          this.userProfileObj["totalMaleFear"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("love")) {
          this.userProfileObj["totalMaleLove"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("optimism")
        ) {
          this.userProfileObj["totalMaleOptimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("pessimism")
        ) {
          this.userProfileObj["totalMalePessimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("sadness")
        ) {
          this.userProfileObj["totalMaleSadness"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("surprise")
        ) {
          this.userProfileObj["totalMaleSurprise"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("trust")
        ) {
          this.userProfileObj["totalMaleTrust"]++;
        }
      } else if (this.data["tweets"][i]["gender"] === "Female") {
        this.userProfileObj["totalFemale"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalFemaleNotHate"]++;
        } else {
          this.userProfileObj["totalFemaleHate"]++;
        }

        // Sentiment Calculation
        if (this.data["tweets"][i]["sentiment"]["pred"] === "neutral") {
          this.userProfileObj["totalFemaleNeutral"]++;
        } else if (this.data["tweets"][i]["sentiment"]["pred"] === "positive") {
          this.userProfileObj["totalFemalePositive"]++;
        } else {
          this.userProfileObj["totalFemaleNegative"]++;
        }

        // Emotion Calculation
        if (this.data["tweets"][i]["emotion"]["pred"].includes("joy")) {
          this.userProfileObj["totalFemaleJoy"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anger")
        ) {
          this.userProfileObj["totalFemaleAnger"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("anticipation")
        ) {
          this.userProfileObj["totalFemaleAnticipation"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("disgust")
        ) {
          this.userProfileObj["totalFemaleDisgust"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("fear")) {
          this.userProfileObj["totalFemaleFear"]++;
        } else if (this.data["tweets"][i]["emotion"]["pred"].includes("love")) {
          this.userProfileObj["totalFemaleLove"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("optimism")
        ) {
          this.userProfileObj["totalFemaleOptimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("pessimism")
        ) {
          this.userProfileObj["totalFemalePessimism"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("sadness")
        ) {
          this.userProfileObj["totalFemaleSadness"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("surprise")
        ) {
          this.userProfileObj["totalFemaleSurprise"]++;
        } else if (
          this.data["tweets"][i]["emotion"]["pred"].includes("trust")
        ) {
          this.userProfileObj["totalFemaleTrust"]++;
        }
      } else if (this.data["tweets"][i]["gender"] === "nan") {
        this.userProfileObj["totalNonRecognized"]++;
        if (this.data["tweets"][i]["hate_speech"] === "1") {
          this.userProfileObj["totalNonRecognizedNotHate"]++;
        } else {
          this.userProfileObj["totalNonRecognizedHate"]++;
        }
      }
    }

    this.ageBars = [
      ["age", "Total", "Hate Speech", "Neutral"],
      [
        "Young",
        this.userProfileObj["totalYoung"],
        this.userProfileObj["totalYoungHate"],
        this.userProfileObj["totalYoungNotHate"]
      ],
      [
        "Middle Aged",
        this.userProfileObj["totalMiddleAged"],
        this.userProfileObj["totalMiddleAgedHate"],
        this.userProfileObj["totalMiddleAgedNotHate"]
      ],
      [
        "Elder",
        this.userProfileObj["totalElder"],
        this.userProfileObj["totalElderHate"],
        this.userProfileObj["totalElderNotHate"]
      ]
    ];
    this.genderBars = [
      ["gender", "Total", "Hate Speech", "Neutral"],
      [
        "Male",
        this.userProfileObj["totalMale"],
        this.userProfileObj["totalMaleHate"],
        this.userProfileObj["totalMaleNotHate"]
      ],
      [
        "Female",
        this.userProfileObj["totalFemale"],
        this.userProfileObj["totalFemaleHate"],
        this.userProfileObj["totalFemaleNotHate"]
      ],
      [
        "Not Recognized",
        this.userProfileObj["totalNonRecognized"],
        this.userProfileObj["totalNonRecognizedHate"],
        this.userProfileObj["totalNonRecognizedNotHate"]
      ]
    ];

    this.sentimentBarsGender = [
      ["Gender Sentiment", "Positive", "Negative", "Neutral"],
      [
        "Male",
        this.userProfileObj["totalMalePositive"],
        this.userProfileObj["totalMaleNegative"],
        this.userProfileObj["totalMaleNeutral"]
      ],
      [
        "Female",
        this.userProfileObj["totalFemalePositive"],
        this.userProfileObj["totalFemaleNegative"],
        this.userProfileObj["totalFemaleNeutral"]
      ]
    ];

    this.sentimentBarsAge = [
      ["Age Group Sentiment", "Positive", "Negative", "Neutral"],
      [
        "Young",
        this.userProfileObj["totalYoungPositive"],
        this.userProfileObj["totalYoungNegative"],
        this.userProfileObj["totalYoungNeutral"]
      ],
      [
        "Middle Aged",
        this.userProfileObj["totalMiddleAgedPositive"],
        this.userProfileObj["totalMiddleAgedNegative"],
        this.userProfileObj["totalMiddleAgedNeutral"]
      ],
      [
        "Elder",
        this.userProfileObj["totalElderPositive"],
        this.userProfileObj["totalElderNegative"],
        this.userProfileObj["totalElderNeutral"]
      ]
    ];
    this.emotionBarsGender = [
      [
        "Gender Emotions",
        "Anger",
        "Anticipation",
        "Disgust",
        "Fear",
        "Joy",
        "Love",
        "Optimism",
        "Pessimism",
        "Sadness",
        "Surpise",
        "Trust"
      ],
      [
        "Male",
        this.userProfileObj["totalMaleAnger"],
        this.userProfileObj["totalMaleAnticipation"],
        this.userProfileObj["totalMaleDisgust"],
        this.userProfileObj["totalMaleFear"],
        this.userProfileObj["totalMaleJoy"],
        this.userProfileObj["totalMaleLove"],
        this.userProfileObj["totalMaleOptimism"],
        this.userProfileObj["totalMalePessimism"],
        this.userProfileObj["totalMaleSadness"],
        this.userProfileObj["totalMaleSurprise"],
        this.userProfileObj["totalMaleTrust"]
      ],
      [
        "Female",
        this.userProfileObj["totalFemaleAnger"],
        this.userProfileObj["totalFemaleAnticipation"],
        this.userProfileObj["totalFemaleDisgust"],
        this.userProfileObj["totalFemaleFear"],
        this.userProfileObj["totalFemaleJoy"],
        this.userProfileObj["totalFemaleLove"],
        this.userProfileObj["totalFemaleOptimism"],
        this.userProfileObj["totalFemalePessimism"],
        this.userProfileObj["totalFemaleSadness"],
        this.userProfileObj["totalFemaleSurprise"],
        this.userProfileObj["totalFemaleTrust"]
      ]
    ];

    this.emotionBarsAge = [
      [
        "Age Group Emotions",
        "Anger",
        "Anticipation",
        "Disgust",
        "Fear",
        "Joy",
        "Love",
        "Optimism",
        "Pessimism",
        "Sadness",
        "Surpise",
        "Trust"
      ],
      [
        "Young",
        this.userProfileObj["totalYoungAnger"],
        this.userProfileObj["totalYoungAnticipation"],
        this.userProfileObj["totalYoungDisgust"],
        this.userProfileObj["totalYoungFear"],
        this.userProfileObj["totalYoungJoy"],
        this.userProfileObj["totalYoungLove"],
        this.userProfileObj["totalYoungOptimism"],
        this.userProfileObj["totalYoungPessimism"],
        this.userProfileObj["totalYoungSadness"],
        this.userProfileObj["totalYoungSurprise"],
        this.userProfileObj["totalYoungTrust"]
      ],
      [
        "Middle Aged",
        this.userProfileObj["totalMiddleAgedAnger"],
        this.userProfileObj["totalMiddleAgedAnticipation"],
        this.userProfileObj["totalMiddleAgedDisgust"],
        this.userProfileObj["totalMiddleAgedFear"],
        this.userProfileObj["totalMiddleAgedJoy"],
        this.userProfileObj["totalMiddleAgedLove"],
        this.userProfileObj["totalMiddleAgedOptimism"],
        this.userProfileObj["totalMiddleAgedPessimism"],
        this.userProfileObj["totalMiddleAgedSadness"],
        this.userProfileObj["totalMiddleAgedSurprise"],
        this.userProfileObj["totalMiddleAgedTrust"]
      ],
      [
        "Elder",
        this.userProfileObj["totalElderAnger"],
        this.userProfileObj["totalElderAnticipation"],
        this.userProfileObj["totalElderDisgust"],
        this.userProfileObj["totalElderFear"],
        this.userProfileObj["totalElderJoy"],
        this.userProfileObj["totalElderLove"],
        this.userProfileObj["totalElderOptimism"],
        this.userProfileObj["totalElderPessimism"],
        this.userProfileObj["totalElderSadness"],
        this.userProfileObj["totalElderSurprise"],
        this.userProfileObj["totalElderTrust"]
      ]
    ];
    this.mapDataSet = true;
  }
}
