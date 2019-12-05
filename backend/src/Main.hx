import php.Web;
import haxe.Json;

class Main{

    public static function main(){
        
        switch(Web.getURI()){

            case "/" :
            
                var output = {
                    message : "Hello"
                };

                Sys.print(Json.stringify(output));

            default :

                Web.setReturnCode(404);
                Sys.print("What ?"); 


        }

    }


}