module.exports = function (sequelize, DataTypes) {
	return sequelize.define('tbl_user', {
		id: {
			type: DataTypes.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING(40),
		},
		reply_to: {
			type: DataTypes.STRING(40),
		},
		article_id: {
			type: DataTypes.INTEGER(11),
		},
		parent_id: {
			type: DataTypes.INTEGER(11),
		},
		content: {
			type: DataTypes.TEXT,
		},
		create_time: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1,
		},
	}, {
		timestamps: false,
		// createAt: 'create_time',
		// UpdateAt: 'last_modify_time',
		tableName: 'tbl_article_comments',
		freezeTableName: true
	});
};
