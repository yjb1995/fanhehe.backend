module.exports = function (sequelize, DataTypes) {
	return sequelize.define('tbl_user', {
		// id: {
		// 	type: DataTypes.INTEGER(11),
		// 	autoIncrement: true,
		// },
		author: {
			type : DataTypes.STRING(40),
		},
		title: {
			type: DataTypes.STRING(40),
		},
		content: {
			type: DataTypes.TEXT,
		},
		create_time: {
			type: DataTypes.DATE,
		},
		last_modify_time: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1,
		},
	}, {
		timestamps: false,
		primaryKey: ['author', 'title'],
		// createAt: 'create_time',
		// UpdateAt: 'last_modify_time',
		tableName: 'tbl_article',
		freezeTableName: true
	});
};
