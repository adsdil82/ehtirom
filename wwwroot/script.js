$(document).ready(function () {

    $("#fordev").hide();

    $('#submitButton').click(function (e) {
        let $this = $(this);
        e.preventDefault();

        let finObjectId = $('#finObjectId').val();
        let infoCode = $('#infoCode').val();
        let finObjectCode = $('#finObjectCode').val();

        let query = "";
        if (finObjectCode) {
            query = "finObjectCode=" + finObjectCode;
        } else {
            query = "finObjectId=" + finObjectId + "&infoCode=" + infoCode;
        }

        let url = "api/application?" + query;
        let breakLine = "\r\n";

        $("#loading").show();

        $.post(url)
            .done(function (data) {
                let xml = $(data);
                let messageToShow = "";
                xml.find("responses").each(function () {
                    let message = "Результат: " + $(this).find("message").text();
                    let receivedDateBegin = "Время отправки: " + $(this).find("received").text();
                    let receivedDateEnd = "Время получения ответа: " + $(this).find("answered").text();
                    let applicationNumber = "Номер заявки: " + $(this).find("claim_id").text();
                    let katmsir = "KATMSIR: " + $(this).find("katm_sir").text();

                    messageToShow = messageToShow + breakLine + message + breakLine +
                        receivedDateBegin + breakLine + receivedDateEnd + breakLine +
                        applicationNumber + breakLine + katmsir + breakLine +
                        "-------------------------" + breakLine;
                });
                $('#xmlAnswerField').text(messageToShow);
                $("#loading").hide();
            })
            .fail(function (xhr, status, error) {
                let parsedData = $.parseXML(xhr.responseText);
                let xml = $(parsedData);
                $('#xmlAnswerField').text("Локальный сервер вернул: " + xhr.status + " статус код." + breakLine + "Сообщение ошибки: " + xml.find("error").text());
                $("#loading").hide();
            });
    });

    $('#showHideLink').click(function (e) {
        e.preventDefault();
        if ($("#fordev").is(":hidden")) {
            $("#fordev").show();
        } else {
            $("#fordev").hide();
        }
    });
});

