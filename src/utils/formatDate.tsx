export function formatDate(isoString: string): string {
    const date = new Date(isoString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo' // fuso horário de Brasília
    };

    return date.toLocaleDateString('pt-BR', options).replace(',', ''); // 'pt-BR' para formato dia/mês/ano em português
  }
   // Saída: 17/07/2024 08:03:58 (considerando UTC-3)
  