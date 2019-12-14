import php.Web;
import haxe.Json;

typedef Survey = {
	name:String,
	code:String,
}

enum Question {
	@:json({'type': 'qcm'}) Qcm(options:Array<String>, answer:Array<Bool>, label:String);
	@:json({'type': 'numeric'}) Numeric(options:Null<String>, answer:Int, label:String);
}

typedef Questionnaire = {
	survey:Survey,
	questions:Array<Question>,
}

class Main {
	public static function readFileContent(filePath:String) {
		var content:String = sys.io.File.getContent(filePath);
		return haxe.Json.parse(content);
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
		var questionnaires:Array<Dynamic> = [];

		for (fichier in fichiers) {
			questionnaires.push({
				name: fichier,
				content: readFileContent(fichier)
			});
		}

		return questionnaires;
	}

	public static function main() {
		switch (Web.getURI()) {
			case "/":
				var output = {
					message: "Hello World"
				};
				Sys.print(Json.stringify(output));
			case "/reponses":
				var fichiers = getAnswerFilenames('./data');
				var questionnaires = getAllAnswersContent(fichiers);
				Sys.print(questionnaires);

			default:
				Web.setReturnCode(404);
				Sys.print("What ?");
		}
	}
}
