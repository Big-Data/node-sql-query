var common     = require('../common');
var assert     = require('assert');

assert.equal(
	common.Select().from('t1').where({ col: 1 }).build(),
	"SELECT * FROM `t1` WHERE (`col` = 1)"
);

assert.equal(
	common.Select().from('t1').where({ col: 'a' }).build(),
	"SELECT * FROM `t1` WHERE (`col` = 'a')"
);

assert.equal(
	common.Select().from('t1').where({ col: 'a\'' }).build(),
	"SELECT * FROM `t1` WHERE (`col` = 'a\\'')"
);

assert.equal(
	common.Select().from('t1').where({ col1: 1, col2: 2 }).build(),
	"SELECT * FROM `t1` WHERE (`col1` = 1 AND `col2` = 2)"
);

assert.equal(
	common.Select().from('t1').where({ col1: 1 }, { col2: 2 }).build(),
	"SELECT * FROM `t1` WHERE (`col1` = 1 AND `col2` = 2)"
);

assert.equal(
	common.Select().from('t1').where({ col: 1 }).where({ col: 2 }).build(),
	"SELECT * FROM `t1` WHERE (`col` = 1) OR (`col` = 2)"
);

assert.equal(
	common.Select().from('t1').where({ col1: 1, col2: 2 }).where({ col3: 3 }).build(),
	"SELECT * FROM `t1` WHERE (`col1` = 1 AND `col2` = 2) OR (`col3` = 3)"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id', 'id')
	               .where('table1', { col: 1 }, 'table2', { col: 2 }).build(),
	"SELECT * FROM `table1` AS `t1` JOIN `table2` AS `t2` ON `t2`.`id` = `t1`.`id` WHERE (`t1`.`col` = 1 AND `t2`.`col` = 2)"
);

assert.equal(
	common.Select().from('table1')
	               .from('table2', 'id', 'id')
	               .where('table1', { col: 1 }, { col: 2 }).build(),
	"SELECT * FROM `table1` AS `t1` JOIN `table2` AS `t2` ON `t2`.`id` = `t1`.`id` WHERE (`t1`.`col` = 1 AND `col` = 2)"
);
