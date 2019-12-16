import massive.munit.client.PrintClient;
import massive.munit.client.RichPrintClient;
import massive.munit.client.HTTPClient;
import massive.munit.client.JUnitReportClient;
import massive.munit.client.SummaryReportClient;
import massive.munit.TestRunner;

/**
 * Auto generated Test Application.
 * Refer to munit command line tool for more information (haxelib run munit)
 */
class TestMain {
	static function main() {
		new TestMain();
	}

	public function new() {
		var suites = new Array<Class<massive.munit.TestSuite>>();
		suites.push(TestSuite);

		#if MCOVER
		var client = new mcover.coverage.munit.client.MCoverPrintClient();
		var httpClient = new HTTPClient(new mcover.coverage.munit.client.MCoverSummaryReportClient());
		#else
		var client = new RichPrintClient();
		var httpClient = new HTTPClient(new SummaryReportClient());
		#end

		var runner:TestRunner = new TestRunner(client);
		runner.addResultClient(httpClient);
		// runner.addResultClient(new HTTPClient(new JUnitReportClient()));

		runner.run(suites);
	}
}
