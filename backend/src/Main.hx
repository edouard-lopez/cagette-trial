import php.Web;
import haxe.Json;

class Main {
	public static function readFileContent(filePath:String) {
		var content:String = sys.io.File.getContent(filePath);
		trace(content);
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
		
	}

	public static function main() {
		switch (Web.getURI()) {
			case "/":
				var output = {
					message: "Hello World"
				};
				Sys.print(Json.stringify(output));
			case "/reponses":
				Sys.print(getAnswerFilenames('./data'));

			default:
				Web.setReturnCode(404);
				Sys.print("What ?");
		}
	}
}
