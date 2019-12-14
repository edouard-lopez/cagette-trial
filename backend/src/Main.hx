import php.Web;
import haxe.Json;

class Main {
	public static function main() {
		var fichiers = Answers.getAnswerFilePathes('./data');
		var answers = Answers.getAllAnswersContent(fichiers);

		switch (Web.getURI()) {
			case "/":
			case "/stats":
				var xx1 = new Stats(answers, 'XX1');
				var xx2 = new Stats(answers, 'XX2');
				var xx3 = new Stats(answers, 'XX3');
				var output = [
					{
						code: xx1.code,
						stat: xx1.compute()
					},
					{
						code: xx2.code,
						stat: xx2.compute()
					},
					{
						code: xx3.code,
						stat: xx3.compute()
					}
				];
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
