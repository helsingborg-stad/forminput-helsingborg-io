const { bookshelf } = require('./db.client');

bookshelf.plugin('registry');

/*  EXAMPLES 
    Implement your db models. 
    @docs: https://bookshelfjs.org/

    const Questions = bookshelf.Model.extend({
        tableName: 'questions',
        form() { return this.belongsTo(Forms); },
        validations() { return this.hasMany(Validations); },
        optionGroup() { return this.hasOne(OptionGroups); },
        choices() { return this.belongsToMany(OptionChoices); },
        type() { return this.hasOne(QuestionTypes); },
    });
    
    const QuestionTypes = bookshelf.Model.extend({
        tableName: 'question_types',
        questions() { return this.belongsToMany(Questions); },
    });

    module.exports = {
        questions: bookshelf.model('Questions', Questions),
        questionTypes: bookshelf.model('QuestionTypes', QuestionTypes),
    };
*/ 

module.exports = {
};
