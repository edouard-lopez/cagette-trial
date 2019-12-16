package;

import Stats;
import massive.munit.Assert;

class StatsTest {
	public function new() {}

	var stats:Stats;

	@Before
	public function setup():Void {
		stats = new Stats([], '');
	}

	@Test
	public function testCreate() {
		var foo = new Stats([], 'XX1');
		Assert.areEqual(foo.code, 'XX1');
	}
}
