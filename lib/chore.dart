class Chore {
  String name;
  bool completed;

  Chore({required String name, bool completed = false})
      : this.name = name,
        this.completed = completed;
}
