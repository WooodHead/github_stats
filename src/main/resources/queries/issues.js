function IssueOpenedCreated() {
    var query = [
        {"$match" : {"repo.id" : { $in: ["%(repoIds)"] }, "payload.action": {"$eq": "opened"} }},
        {
            $group : {
                _id:{'repo': '$repo.id', 'issue': '$payload.issue.id'},
                date: {$max: '$created_at'}
            }
        }
    ];

    return JSON.stringify(query);
}

function IssueNonOpenedCreated() {
    var query = [
         {"$match" : {"repo.id" : { $in: ["%(repoIds)"] }, "payload.action": {"$ne": "opened"} }},
         {
             $group : {
                         _id:{'repo': '$repo.id', 'issue': '$payload.issue.id'},
                         minDate: {$min: '$created_at'}
                  }
         },
     ];

     return JSON.stringify(query);
 }