for (let i = 1; i <= 10; i++) {    
    document.write('<table border ="1">');
    document.write('<thead><tr><th colspan="2">Produtos de ' + i + '</th></tr></thead>');
    document.write('<tbody>');
    for (let j = 1; j <= 10; j++) {   
        document.write('<tr><td>' + i + 'x' + j + '</td><td>' + (i * j) + '</td></tr>');
    }
    document.write('</tbody>');
    document.write("</table>");
}