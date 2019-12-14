import php.Web;
import haxe.Json;
import tink.Json;

typedef Survey = {
	name:String,
	code:String,
}

enum Question {
	@:json({'type': 'qcm'}) Qcm(options:Array<String>, answer:Array<Bool>, label:String);
	@:json({'type': 'numeric'}) Numeric(options:Null<String>, answer:Int, label:String);
}

typedef AnswerContent = {
	survey:Survey,
	questions:Array<Question>,
}

typedef Answer = {
	uuid:String,
	survey:Survey,
	questions:Array<Question>,
}

class Main {
	public static function readFileContent(filePath:String) {
		var content:String = sys.io.File.getContent(filePath);
		var parsedContent:AnswerContent = tink.Json.parse(content);

		return parsedContent;
	}

	public static function getAnswerFilenames(directory:String = "path/to/") {
		var fichiers:Array<String> = [];

		for (file in sys.FileSystem.readDirectory(directory)) {
			var filePath = haxe.io.Path.join([directory, file]);
			var isFile = (filePath:String) -> !sys.FileSystem.isDirectory(filePath);
			var isJson = (filePath:String) -> new haxe.io.Path(filePath).ext == 'json';

			if (isFile(filePath) && isJson(filePath)) {
				fichiers.push(filePath);
			}
		}
		return fichiers;
	}

	public static function getAllAnswersContent(fichiers:Array<String>) {
		var answers:Array<Answer> = [];

		for (fichier in fichiers) {
			var answer:AnswerContent = readFileContent(fichier);
			var uuid:String = new haxe.io.Path(fichier).file;
			answers.push({
				uuid: uuid,
				survey: answer.survey,
				questions: answer.questions,
			});
		}

		return answers;
	}

	public static function main() {
		switch (Web.getURI()) {
			case "/":
				var output = {
					message: "Hello World"
				};
				Sys.print(Json.stringify(output));
			case "/answers":
				var fichiers = getAnswerFilenames('./data');
				var answers = getAllAnswersContent(fichiers);
				Web.setReturnCode(200);
				Web.setHeader('Content-Type', 'application/json');
				Sys.print(tink.Json.stringify(answers));

			default:
				Web.setReturnCode(404);
				Sys.print("What ?");
		}
	}
}
