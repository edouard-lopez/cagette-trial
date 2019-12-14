package;

import Answers.Answer;

typedef Stat = {
	qcm:Map<String, Int>,
	numeric:Int
}

class Stats {
	public var code:String;
	public var answersForCode:Array<Answer>;
	public var stat:Stat = {qcm: [], numeric: 0};

	public function compute() {
		for (answer in answersForCode) {
			var qcmQuestion = answer.questions[0];
			var numericQuestion = answer.questions[1];

			var options:Array<String> = qcmQuestion.getParameters()[0];
			var answers:Array<Bool> = qcmQuestion.getParameters()[1];
			var i = -1;
			while (i++ < answers.length - 1) {
				if (!stat.qcm.exists(options[i])) {
					stat.qcm[options[i]] = 0;
				}
				stat.qcm[options[i]] += answers[i] ? 1 : 0;
			}
			var answer:Int = numericQuestion.getParameters()[1];
			stat.numeric += answer;
		}

		var result:Stat = {
		    qcm: stat.qcm,
		    numeric: Std.int(stat.numeric / answersForCode.length)
		}

		return result;
	}

	public function new(answers:Array<Answer>, code:String) {
		this.code = code;
		this.answersForCode = [for (answer in answers) if (answer.survey.code == code) answer];
	}
}
