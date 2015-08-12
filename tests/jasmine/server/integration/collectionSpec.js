describe('personAdd', function(){
  it('Should add a valid person', function(){
    var newPerson = {};
    newPerson.firstName = 'Joe';
    newPerson.lastName = 'Blow';
    newPerson.homePhone = '0201234455';
    newPerson.mobilePhone = '0613244321';
    var result = Meteor.call('personAdd',newPerson);
    expect(result.length).toBe(17);
  });
});
