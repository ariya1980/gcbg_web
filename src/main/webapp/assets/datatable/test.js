function Set_Datatable_AnnualPeroidSetting(response) {
    $('#Datatable_AnnualPeroidSetting').DataTable({
        data: response,
        destroy: true,
        searching: true,
        "bAutoWidth": false,
        "aaSorting": [[0, 'asc']],
        columns: [
            
            {
                data: "Peroid_Send_Mail_Date", className: "dt-center", searchable: false, width: "150px",
                render: function (data, type, row) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                data: "Peroid_Start_Date", className: "dt-center", searchable: false, width: "150px",
                render: function (data, type, row) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                data: "Peroid_End_Date", className: "dt-center", searchable: false, width: "150px",
                render: function (data, type, row) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { data: "Peroid_Dadeline_Alert", className: "dt-center", width: "150px" },
            { data: "Peroid_Status", className: "dt-center", width: "60px" },
            {
                data: "Create_Date", className: "dt-center", searchable: false, width: "150px",
                render: function (data, type, row) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                width: "30px", className: "dt-center", searchable: false,
                render: function (data, type, full, meta) {
                    let Peroid_ID = full.Peroid_ID;
                    let Peroid_Send_Mail_Date = full.Peroid_Send_Mail_Date;
                    let Peroid_Dadeline_Alert = full.Peroid_Dadeline_Alert;
                    let Peroid_Start_Date = full.Peroid_Start_Date;
                    let Peroid_End_Date = full.Peroid_End_Date;
                    let Peroid_Status = full.Peroid_Status
                    let check = false;
                    if (full.Peroid_Send_Mail_Date != null) {
                        if (full.Peroid_Send_Mail_Date.indexOf('(') >= 0) {
                            Peroid_Send_Mail_Date = full.Peroid_Send_Mail_Date.substring(full.Peroid_Send_Mail_Date.indexOf("(") + 1, full.Peroid_Send_Mail_Date.indexOf(")"));
                            Peroid_Start_Date = full.Peroid_Start_Date.substring(full.Peroid_Start_Date.indexOf("(") + 1, full.Peroid_Start_Date.indexOf(")"));
                            Peroid_End_Date = full.Peroid_End_Date.substring(full.Peroid_End_Date.indexOf("(") + 1, full.Peroid_End_Date.indexOf(")"));
                            check = true;
                        }
                    }
                    stringreturn = '<button type="button" class="btn" style="background-color: #FFC107;color: #fff;" data-toggle="tooltip" title="แก้ไขเอกสาร"  onclick="Edit(\'' + Peroid_ID + '\',\'' + Peroid_Send_Mail_Date + '\',\'' + Peroid_Dadeline_Alert + '\',\'' + Peroid_Start_Date + '\',\'' + Peroid_End_Date + '\',\'' + Peroid_Status + '\',' + check + ')"><i class="fa fa-pencil"></i></button>';
                    return stringreturn;
                }
            }
        ], "columnDefs": [{
            "targets": 6,
            "orderable": false
        }]
         , 'rowCallback': function (row, data, index) {
             if (data.Peroid_Status.trim().toLowerCase() == "active") {
                 $(row).find('td:eq(4)').css('color', 'green');
             }
             else if (data.Peroid_Status.trim().toLowerCase() != "active") {
                 $(row).find('td:eq(4)').css('color', 'red');
             }
         }
    });
};