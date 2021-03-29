write-records read-records modify-records: write-record.o write-records.o \
	read-record.o read-records.o count-chars.o write-newline.o \
	modify-records.o
	ld write-record.o write-records.o -o write-records
	ld read-record.o count-chars.o \
	write-newline.o read-records.o -o read-records
	ld read-record.o write-record.o modify-records.o -o modify-records

read-record.o: read-record.asm
	nasm -f elf64 read-record.asm -o read-record.o

read-records.o: read-records.asm
	nasm -f elf64 read-records.asm -o read-records.o

write-record.o: write-record.asm
	nasm -f elf64 write-record.asm -o write-record.o

write-records.o: write-records.asm
	nasm -f elf64 write-records.asm -o write-records.o

count-chars.o: count-chars.asm
	nasm -f elf64 count-chars.asm -o count-chars.o

write-newline.o: write-newline.asm
	nasm -f elf64 write-newline.asm -o write-newline.o

modify-records.o: modify-records.asm
	nasm -f elf64 modify-records.asm -o modify-records.o

clean:
	rm *.o
