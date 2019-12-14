package;

typedef Survey = {
	name:String,
	code:String,
}

enum Question { // extract
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

class Answers {
	public static function readFileContent(filePath:String) {
		var content:String = sys.io.File.getContent(filePath);
		var parsedContent:AnswerContent = tink.Json.parse(content);

		return parsedContent;
	}

	public static function getAnswerFilePathes(directory:String = "path/to/") {
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
}
