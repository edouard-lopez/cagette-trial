import php.Web;
import haxe.Json;

class Main {
	public static function main() {
		var fichiers = Answers.getAnswerFilePathes('./data');
		var answers = Answers.getAllAnswersContent(fichiers);

		switch (Web.getURI()) {
			case "/":
			case "/stats":
				var xx1Stats = new Stats(answers, 'XX1');
				var output = {
					code: xx1Stats.code,
					stat: xx1Stats.compute()
				};
				Web.setReturnCode(200);
				Web.setHeader('Content-Type', 'application/json');
				Sys.print(Json.stringify(output));
			case "/answers":
				Web.setReturnCode(200);
				Web.setHeader('Content-Type', 'application/json');
				Sys.print(tink.Json.stringify(answers));

			default:
				Web.setReturnCode(404);
				Sys.print("What ?");
		}
	}
}
